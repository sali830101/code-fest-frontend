'''
This script performs data cleaning and visualization for a city app service performance analysis.
'''


# Import required modules
import pandas as pd
import json
import matplotlib.pyplot as plt
from matplotlib.gridspec import GridSpec

# Purpose: This script performs data cleaning and visualization for a city app service performance analysis.
# It imports data, processes it, and generates a dashboard with various charts to analyze the performance and distribution of services.

# Data Cleaning ####################################

# 1. Import data from JSON files
with open(r'./data/event_list.json', 'r') as file:
    event_list = json.load(file)
with open(r'./data/user_list.json', 'r') as file:
    user_list = json.load(file)

dfr_event = pd.json_normalize(event_list)
dfr_event['category'] = dfr_event['category'].replace('人力 (小幫手)', '小幫手')

dfr_user = pd.json_normalize(user_list)

dfr_comments = pd.json_normalize(dfr_event['comments'])

dfr_comments = pd.DataFrame({
    'event_id': dfr_event['event_id'],  
    'category': dfr_event['category'], 
    'comment_id': dfr_comments.apply(lambda x: x[0].get('comment_id'), axis=1),
    'user_id': dfr_comments.apply(lambda x: x[0].get('user_id'), axis=1),
    'datetime': dfr_comments.apply(lambda x: x[0].get('datetime'), axis=1),
    'comment': dfr_comments.apply(lambda x: x[0].get('comment'), axis=1)
})

df_user_expanded = pd.json_normalize(dfr_user['data.addresses'])
df_user_expanded = pd.DataFrame({
    'user_id': dfr_user['data.id'],  
    'town': df_user_expanded.apply(lambda x: x[0].get('town'), axis=1)
})

df_comments = pd.merge(dfr_comments, df_user_expanded, how='left', on='user_id')

# Create Dashboard #####################################

# Set font and color settings
plt.rcParams['font.sans-serif'] = ['Arial Unicode Ms']
status_colors = ['#6096B4', '#EEE9DA', '#BDCDD6', '#93BFCF']
category_colors = {
    '食物': '#6096B4',
    '物品': '#BDCDD6',
    '小幫手': '#93BFCF'
}

# Create figure and GridSpec layout with a 16:9 aspect ratio
fig = plt.figure(figsize=(16, 9))
gs = GridSpec(2, 2, width_ratios=[1, 2])

# 1. Pie Chart: Distribution of Case Status
status_counts = dfr_event['status'].value_counts()

def func(pct, allvals):
    """Format for displaying percentage in pie chart."""
    absolute = int(pct / 100. * sum(allvals))
    return f'{absolute} ({pct:.1f}%)'

ax1 = fig.add_subplot(gs[:, 0])
ax1.pie(status_counts, 
        labels=status_counts.index, 
        autopct=lambda pct: func(pct, status_counts),
        startangle=140, 
        colors=status_colors,
        wedgeprops=dict(edgecolor='white')) 
ax1.set_title('案件狀態分佈')

# 2. Bar Chart: Proportion of Help Needed by Region
category_town_count = df_comments.groupby(['town', 'category']).size().unstack(fill_value=0)
category_town_proportion = category_town_count.div(category_town_count.sum(axis=1), axis=0) * 100

ax2 = fig.add_subplot(gs[0, 1])
category_town_proportion.plot(kind='barh', stacked=True, color=[category_colors.get(cat, '#93BFCF') for cat in category_town_proportion.columns], edgecolor='white', linewidth=1.2, ax=ax2)
ax2.set_title('各區域的 Category 比例分佈')
ax2.set_xlabel('百分比 (%)')
ax2.set_ylabel('區域')

for container in ax2.containers:
    ax2.bar_label(container, fmt='%.1f%%', label_type='center', fontsize=10, color='black')

ax2.legend(title='類別', bbox_to_anchor=(1.05, 1), loc='upper left')

# 3. Line Chart: Number of Comments Per Hour by Category
df_comments['datetime'] = pd.to_datetime(df_comments['datetime'])
df_comments['hour'] = df_comments['datetime'].dt.hour
hourly_counts = df_comments.groupby(['hour', 'category']).size().unstack(fill_value=0)

ax3 = fig.add_subplot(gs[1, 1])
for category in hourly_counts.columns:
    ax3.plot(hourly_counts.index, hourly_counts[category], marker='o', color=category_colors.get(category, '#93BFCF'), label=category)

ax3.set_title('每小時不同類別的留言數量變化')
ax3.set_xlabel('小時')
ax3.set_ylabel('留言數量')
ax3.set_xticks(range(24))

ax3.legend(title='類別', bbox_to_anchor=(1.05, 1), loc='upper left')
ax3.grid(False)

fig.suptitle('Performance Analysis', fontsize=24, ha='left', x=0.12, y=0.9)
plt.subplots_adjust(left=0.1, right=0.9, top=0.9, bottom=0.1)

plt.show()
