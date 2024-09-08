import { useState, useEffect, useRef } from "react";
import { Box, Button, Typography, useTheme, Chip, CardMedia, IconButton } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import Map from "../component/Map";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, { toggleButtonGroupClasses } from "@mui/material/ToggleButtonGroup";
import AddIcon from "@mui/icons-material/Add";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const statusOption = [
  { label: "完成", value: "completed" },
  { label: "過期", value: "expired" },
  { label: "取消", value: "cancelled" },
  { label: "開放中", value: "open" },
];

const districtOption = [
  { label: "中正區", value: "中正區", coordinates: [121.516921, 25.037491] },
  { label: "大同區", value: "大同區", coordinates: [121.51546603410668, 25.06592787526384] },
  { label: "中山區", value: "中山區", coordinates: [121.53369160802754, 25.064310820972267] },
  { label: "松山區", value: "松山區", coordinates: [121.57732555563439, 25.049853611139127] },
  { label: "大安區", value: "大安區", coordinates: [121.540652, 25.031515] },
  { label: "萬華區", value: "萬華區", coordinates: [121.496747, 25.028171] },
  { label: "信義區", value: "信義區", coordinates: [121.57283590648694, 25.033041383669655] },
  { label: "士林區", value: "士林區", coordinates: [121.52557815600028, 25.09135929204008] },
  { label: "北投區", value: "北投區", coordinates: [121.523992, 25.157915] },
  { label: "內湖區", value: "內湖區", coordinates: [121.595569, 25.09487] },
  { label: "南港區", value: "南港區", coordinates: [121.611237, 25.039229] },
  { label: "文山區", value: "文山區", coordinates: [121.573265, 24.988882] },
];

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    margin: theme.spacing(0.5),
    border: 0,
    borderRadius: theme.shape.borderRadius,
    [`&.${toggleButtonGroupClasses.disabled}`]: {
      border: 0,
    },
  },
  [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]: {
    marginLeft: -1,
    borderLeft: "1px solid transparent",
  },
}));

const HomeView = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const map = useRef();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [allRequests, setAllRequests] = useState([]);
  const [requestsInView, setRequestsInView] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [search, setSearch] = useState("");
  const catDict = {
    food: "食物",
    item: "物品",
    help: "人力 (小幫手)",
  };
  const [categories, setCategories] = useState(catDict[category]);
  const [status, setStatus] = useState(["open"]);
  const [district, setDistrict] = useState(districtOption.map((s) => s.value));

  const handleCategory = (event, newCategory) => {
    console.log(newCategory);
    setCategories(newCategory);
    let newCategories = [newCategory];
    map.current.setFilter("requests", ["any", ...newCategories.map((c) => ["==", "category", c])]);
    let filtered = allRequests.filter((r) => newCategories.includes(r.category));
    if (search) {
      filtered = filtered.filter((r) => r.post.includes(search) || r.title.includes(search) || r.hashtag.join(",").includes(search));
    }
    setFilteredRequests([...filtered]);
  };

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    fetch("event_list.json")
      .then((response) => response.json())
      .then((data) => {
        const d = window.localStorage.getItem("data");
        // window.localStorage.setItem("data", JSON.stringify(data));
        if (!d) {
          window.localStorage.setItem("data", JSON.stringify(data));
        } else {
          const requests = JSON.parse(d);
          const requestObjects = requests.map((r) => {
            return {
              ...r,
              postDateString: r.post_datetime ? new Date(r.post_datetime).toLocaleDateString() : null,
              startDateString: r.start_date ? new Date(r.start_date).toLocaleDateString() : null,
              endDateString: r.end_date ? new Date(r.end_date).toLocaleDateString() : null,
            };
          });
          let filtered = allRequests.filter((r) => [categories].includes(r.category));
          console.log(requestObjects);
          setAllRequests(requestObjects);
          setFilteredRequests(filtered);
          addMapPoints(requestObjects);
        }
      });
    fetch("user_list.json")
      .then((response) => response.json())
      .then((users) => {
        console.log(users.map((u) => u.data));
        setUsers(users.map((u) => u.data));
      });
  };

  const addMapPoints = (requests) => {
    map.current.on("load", async () => {
      const food = await map.current.loadImage("icons/foods.png");
      const people = await map.current.loadImage("icons/hands.png");
      const item = await map.current.loadImage("icons/objects.png");
      map.current.addImage("食物", food.data);
      map.current.addImage("人力 (小幫手)", people.data);
      map.current.addImage("物品", item.data);
      map.current.addSource("requests", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: requests.map((r) => {
            return {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [r.coordinate[1], r.coordinate[0]],
              },
              properties: r,
            };
          }),
        },
      });
      map.current.addLayer({
        id: "requests",
        type: "symbol",
        source: "requests",
        layout: {
          "icon-image": ["get", "category"],
          "icon-size": 0.05,
        },
      });
      console.log(["any", ...[categories].map((c) => ["==", "category", c])]);
      map.current.setFilter("requests", ["any", ...[categories].map((c) => ["==", "category", c])]);
      addMapEvent(requests);
      setMapLoaded(true);
    });
  };

  const addMapEvent = (requests) => {
    // map.current.on("move", function () {
    //   if (!search) {
    //     let features = map.current.queryRenderedFeatures({ layers: ["requests"] });
    //     let eventIdsInView = features.map((f) => f.properties.event_id);
    //     setFilteredRequests(requests.filter((r) => eventIdsInView.includes(r.event_id)));
    //   }
    // });
    map.current.on("click", "requests", (e) => {
      const request = e.features[0];
      navigate(`/modules/event?event_id=${request.properties.event_id}`);
    });
  };

  const onMapMove = () => {
    if (!search) {
      let features = map.current.queryRenderedFeatures({
        layers: ["requests"],
      });
      let eventIdsInView = features.map((f) => f.properties.event_id);
      setFilteredRequests(allRequests.filter((r) => eventIdsInView.includes(r.event_id)));
    }
  };

  useEffect(() => {
    if (map.current && mapLoaded) {
      map.current.on("move", onMapMove);
      return () => map.current.off("move", onMapMove);
    }
  }, [search, mapLoaded]);

  const getUser = (id) => {
    return users.filter((u) => u.id === id)[0];
  };

  const searchRequests = (event) => {
    const filtered = allRequests.filter(
      (r) => r.post.includes(event.target.value) || r.title.includes(event.target.value) || r.hashtag.join(",").includes(event.target.value)
    );
    setSearch(event.target.value);
    setFilteredRequests(filtered);
  };

  const zoomToDistrict = (event) => {
    setDistrict(event.target.value);
    const target = districtOption.filter((d) => d.value === event.target.value)[0];
    map.current.flyTo({
      center: target.coordinates,
      zoom: 12,
      speed: 0.5,
      curve: 1,
      easing(t) {
        return t;
      },
      essential: true,
    });
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} width="100%" height="100%">
      <Box display="flex" flexDirection="column" gap={1}>
        <StyledToggleButtonGroup size="small" color="primary" value={categories} exclusive onChange={handleCategory} aria-label="Platform">
          <ToggleButton value={"人力 (小幫手)"}>
            <img height={30} alt="logo" src="icons/hands.png" />
          </ToggleButton>
          <ToggleButton value={"物品"}>
            <img height={30} alt="logo" src="icons/objects.png" />
          </ToggleButton>
          <ToggleButton value={"食物"}>
            <img height={30} alt="logo" src="icons/foods.png" />
          </ToggleButton>
        </StyledToggleButtonGroup>
        <TextField
          size={"small"}
          variant="outlined"
          placeholder="搜尋"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          value={search}
          onChange={searchRequests}
        />
      </Box>
      <Box display="flex" gap={1}>
        <FormControl sx={{ flex: 1 }}>
          <InputLabel id="demo-multiple-chip-label">行政區</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={district}
            label="行政區"
            onChange={zoomToDistrict}
            size="small"
            sx={{ height: 41 }}
          >
            {districtOption.map((o) => (
              <MenuItem key={o.value} value={o.value}>
                {o.label}
              </MenuItem>
            ))}
          </Select>
          {/* <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={district}
            onChange={(event) => {
              const {
                target: { value },
              } = event;
              setDistrict(
                // On autofill we get a stringified value.
                typeof value === "string" ? value.split(",") : value
              );
            }}
            size="small"
            input={<OutlinedInput id="select-multiple-chip" label="行政區" size={"small"} k />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value, index) => {
                  return (
                    index < 2 && (
                      <Chip
                        size={"small"}
                        key={value}
                        label={districtOption.filter((o) => o.value === value)[0].label}
                        sx={{ "& .MuiChip-label": { fontSize: 8 } }}
                      />
                    )
                  );
                })}
                {selected.length > 2 && <Typography>...</Typography>}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {districtOption.map((o) => (
              <MenuItem key={o.value} value={o.value}>
                {o.label}
              </MenuItem>
            ))}
          </Select> */}
        </FormControl>
        <FormControl sx={{ flex: 1 }}>
          <InputLabel id="demo-multiple-chip-label">狀態</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={status}
            onChange={(event) => {
              const {
                target: { value },
              } = event;
              setStatus(
                // On autofill we get a stringified value.
                typeof value === "string" ? value.split(",") : value
              );
            }}
            size="small"
            input={<OutlinedInput id="select-multiple-chip" label="狀態" size={"small"} k />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value, index) => {
                  return (
                    index < 2 && (
                      <Chip
                        size={"small"}
                        key={value}
                        label={statusOption.filter((o) => o.value === value)[0].label}
                        sx={{ "& .MuiChip-label": { fontSize: 8 } }}
                      />
                    )
                  );
                })}
                {selected.length > 2 && <Typography>...</Typography>}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {statusOption.map((o) => (
              <MenuItem key={o.value} value={o.value}>
                {o.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box width="100%" height={180} position="relative" sx={{ zIndex: `${theme.zIndex.drawer + 3} !important` }}>
        <Map ref={map} lng={121.5151569} lat={25.0554262} zoom={12}></Map>
      </Box>
      <Box maxHeight={180} sx={{ overflowY: "auto" }} display="flex" flexDirection="column" gap={1}>
        {filteredRequests.length > 0 &&
          filteredRequests.map((row) => (
            <Card
              sx={{
                maxWidth: "100%",
                minHeight: 60,
                display: "flex",
                gap: 2,
                alignItems: "center",
                padding: 1,
              }}
              // display="flex"
              key={row.event_id}
              // gap={2}
              // alignItems={"center"}
              onClick={() => {
                navigate(`/modules/event?event_id=${row.event_id}`);
              }}
            >
              {/* <Box
            display="flex"
            key={row.event_id}
            gap={2}
            alignItems={"center"}
            onClick={() => {
              navigate(`/modules/event?event_id=${row.event_id}`);
            }}
          > */}
              <Avatar sx={{ bgcolor: theme.palette.primary.main }} aria-label="recipe">
                {getUser(row.post_user_id)?.realName.substring(0, 1)}
              </Avatar>
              <Box flex={1}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "text.secondary",
                    fontWeight: "bold",
                    fontSize: "0.8rem",
                  }}
                >
                  {row.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {row.post?.length > 10 ? `${row.post.substring(0, 10)}...` : row.post}
                </Typography>
              </Box>
              {row.image && <img height="30" width="30" src={`images/${row.image}`} alt="image" style={{ objectFit: "cover" }} />}
              {/* </Box> */}
            </Card>
          ))}
      </Box>
      <IconButton
        aria-label="add"
        sx={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: theme.palette.primary.main,
        }}
        onClick={() => {
          navigate("/modules/form");
        }}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
};
export default HomeView;
