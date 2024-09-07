import { useState, useEffect, useRef } from "react";
import { Box, TextField, Button, Typography, useTheme, Chip, CircularProgress, Divider } from "@mui/material";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";

const EventView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const event_id = searchParams.get("event_id");
  const theme = useTheme();
  const [users, setUsers] = useState([]);
  const [allRequests, setAllRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState();
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (event_id) {
      initData();
    }
  }, [event_id]);

  const initData = async () => {
    fetch("user_list.json")
      .then((response) => response.json())
      .then((users) => {
        setUsers(users.map((u) => u.data));
        const d = window.localStorage.getItem("data");
        const requests = JSON.parse(d);
        const requestObjects = requests.map((r) => {
          return {
            ...r,
            postDateString: r.post_datetime ? new Date(r.post_datetime).toLocaleDateString() : null,
            startDateString: r.start_date ? new Date(r.start_date).toLocaleDateString() : null,
            endDateString: r.end_date ? new Date(r.end_date).toLocaleDateString() : null,
          };
        });
        setSelectedRequest(requestObjects.filter((r) => r.event_id == event_id)[0]);
        setAllRequests(requestObjects);
      });
  };

  const getUser = (id) => {
    return users.filter((u) => u.id === id)[0];
  };

  const addComment = () => {
    const current = new Date();
    selectedRequest.comments.push({
      user_id: "12345678-9012-3456-abcd-ef9012345678",
      datetime: `${current.getFullYear()}-${
        current.getMonth() + 1
      }-${current.getDate()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`,
      comment: comment,
    });
    setSelectedRequest({ ...selectedRequest });
    setComment("");
    const targetRequestIndex = allRequests.findIndex((r) => r.event_id === selectedRequest.event_id);
    allRequests.splice(targetRequestIndex, 1, selectedRequest);
    window.localStorage.setItem("data", JSON.stringify(allRequests));
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} width="100%" height="100%">
      {!selectedRequest && <CircularProgress></CircularProgress>}
      {selectedRequest && (
        <Card sx={{ maxWidth: "100%" }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {getUser(selectedRequest.post_user_id)?.realName.substring(0, 1)}
              </Avatar>
            }
            // action={
            //   <IconButton aria-label="settings">
            //     <MoreVertIcon />
            //   </IconButton>
            // }
            title={selectedRequest.title}
            subheader={selectedRequest.postDateString}
          />
          {selectedRequest.image && (
            <CardMedia component="img" height="100" image={`images/${selectedRequest.image}`} alt="image" sx={{ objectFit: "contain" }} />
          )}
          <CardContent>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {`時間: ${selectedRequest.start_date} - ${selectedRequest.end_date}`}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {selectedRequest.post}
                </Typography>
              </Box>
              <Box display={"flex"} gap={0.5}>
                {selectedRequest.hashtag.map((hashtag) => (
                  <Chip key={hashtag} label={hashtag} />
                ))}
              </Box>
              <Box marginTop={2}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  留言
                </Typography>
                <Divider />
              </Box>
              <Box maxHeight={200} sx={{ overflowY: "auto" }} display="flex" flexDirection="column" gap={1}>
                {selectedRequest.comments.map((comment) => {
                  return (
                    <Box display="flex" key={comment.comment_id} gap={2}>
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }} aria-label="recipe">
                        {getUser(comment.user_id)?.realName.substring(0, 1)}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                          {comment.datetime}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                          {comment.comment}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              <Box display={"flex"} width={"100%"}>
                <TextField
                  sx={{ flex: 1 }}
                  size={"small"}
                  id="standard-multiline-flexible"
                  label="留言"
                  multiline
                  maxRows={4}
                  variant="standard"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                />
                <Button onClick={addComment}>送出</Button>
              </Box>
            </Box>
          </CardContent>
          {/* <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions> */}
        </Card>
      )}
    </Box>
  );
};
export default EventView;
