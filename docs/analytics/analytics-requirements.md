# Analytics Feature Requirements

## Overview

This document outlines the requirements and decisions for the analytics feature, which will be accessed by users with lead and admin roles.

## API Endpoints

The feature will utilize four API endpoints:

1. GET Get Top Recipients
2. GET Get Top Teams
3. GET Get Trending Categories
4. GET Get Trending Keywords

## Data Requirements

The following data requirements have been identified for each endpoint:

### GET Get Top Recipients

- Recipient names/IDs
- Number/count of kudos received
- Time period (potentially for filtering: weekly, monthly, all-time)
- Possibly categories of kudos received
- Recipient department/team information

### GET Get Top Teams

- Team names/IDs
- Total kudos count per team
- Number of team members receiving kudos
- Average kudos per team member
- Time period data

### GET Get Trending Categories

- Category names
- Category usage counts/percentages
- Growth rate (compared to previous period)
- Time series data (to show trends over time)
- Associated top keywords per category

### GET Get Trending Keywords

- Keywords/tags
- Usage frequency/count
- Growth rate
- Time period information
- Related categories
- Sentiment analysis (potentially positive/negative connotations)

## General Requirements

For all endpoints, the following features may be required:

- Pagination parameters for large datasets
- Sorting options (e.g., sort by count, alphabetical, recency)
- Filtering capabilities (by date range, department, etc.)
- Response metadata (total count, page info)

## Implementation Details

The implementation will involve:

1. Creating an analytics module following the Clean Architecture pattern
2. Designing UI components following Atomic Design methodology
3. Implementing role-based access (admin and lead only)
4. Creating data visualization components for the analytics data

### Charting Library

For implementing the visualizations, we will use the **Recharts** library:

- React-specific charting library
- Good integration with Next.js
- Responsive and customizable
- Built on D3.js with simpler API
- Good TypeScript support

## Decisions

### Visualization Approaches

#### Top Recipients

- **Primary Visualization**: Horizontal bar chart
  - Recipient names on Y-axis, kudos count on X-axis
  - Recipients sorted by count in descending order
  - Enhanced with profile avatars beside names (if available)
  - Visual badges/indicators for top 3 recipients (gold, silver, bronze)
- **Supplementary Elements**: Table below the chart with additional details
  - Department/team information (if available)
  - Trend indicators (percentage change from previous period)
  - Option to view more recipients beyond the top 5/10 shown in the chart

**Sample Response Structure**:

```json
{
  "status": "success",
  "data": [
    {
      "recipientName": "Sample Recipient 1",
      "count": 1
    },
    {
      "recipientName": "Sample Recipient 2",
      "count": 1
    }
  ]
}
```

**User Customization Options**:

- **Period Selector**:
  - Three options: "Weekly", "Monthly", "Yearly"
  - Controls the `period` query parameter
- **Limit Control**:
  - Three options: "Top 5", "Top 10", "Top 20"
  - Controls the `limit` query parameter
- **View Toggle**:
  - Two options: "Bar Chart" and "Pie Chart"
  - Allows users to switch between visualization types

#### Top Teams

- **Primary Visualization**: Pie Chart
  - Each slice represents a team
  - Size of slice proportional to kudos count
  - Color-coded for different teams
  - Labels showing team name and count/percentage
  - Legend identifying each team by color

**Sample Response Structure**:

```json
{
  "status": "success",
  "data": [
    {
      "teamId": 2,
      "teamName": "Product",
      "count": 1
    },
    {
      "teamId": 3,
      "teamName": "Design",
      "count": 1
    },
    {
      "teamId": 4,
      "teamName": "Marketing",
      "count": 1
    },
    {
      "teamId": 5,
      "teamName": "Sales",
      "count": 1
    }
  ]
}
```

**User Customization Options**:

- **Period Selector**:
  - Three options: "Weekly", "Monthly", "Yearly"
  - Controls the `period` query parameter
- **Limit Control**:
  - Two options: "Top 5", "Top 10"
  - Controls the `limit` query parameter
- **View Toggle**:
  - Two options: "Pie Chart" and "Bar Chart"
  - Allows users to switch between visualization types

#### Trending Categories

- **Primary Visualization**: Bubble Chart (using Recharts ScatterChart)
  - Each category represented as a bubble
  - Size of bubble proportional to count/usage
  - Color-coded categories
  - Interactive tooltips showing exact counts
  - Arranged in a visually appealing grid layout

**Sample Response Structure**:

```json
{
  "status": "success",
  "data": [
    {
      "categoryId": 2,
      "categoryName": "Innovation",
      "count": 1
    },
    {
      "categoryId": 3,
      "categoryName": "Helping Hand",
      "count": 1
    },
    {
      "categoryId": 4,
      "categoryName": "Problem Solving",
      "count": 1
    },
    {
      "categoryId": 5,
      "categoryName": "Leadership",
      "count": 1
    }
  ]
}
```

**User Customization Options**:

- **Period Selector**:
  - Three options: "Weekly", "Monthly", "Yearly"
  - Controls the `period` query parameter
- **Limit Control**:
  - Three options: "Top 5", "Top 10", "Top 15"
  - Controls the `limit` query parameter
- **View Toggle**:
  - Two options: "Bubble Chart" and "Tree Map"
  - Allows users to switch between visualization types

#### Trending Keywords

- **Primary Visualization**: Horizontal Bar Chart
  - Keywords on Y-axis, count on X-axis
  - Keywords sorted by count in descending order
  - Different color intensities based on count
  - Interactive bars with tooltips showing exact counts

**Sample Response Structure**:

```json
{
  "status": "success",
  "data": [
    {
      "keyword": "sample",
      "count": 5
    },
    {
      "keyword": "kudos",
      "count": 5
    },
    {
      "keyword": "work!",
      "count": 5
    },
    {
      "keyword": "card",
      "count": 5
    },
    {
      "keyword": "message",
      "count": 5
    }
  ]
}
```

**User Customization Options**:

- **Period Selector**:
  - Three options: "Weekly", "Monthly", "Yearly"
  - Controls the `period` query parameter
- **Limit Control**:
  - Three options: "Top 10", "Top 20", "Top 30"
  - Controls the `limit` query parameter
- **View Toggle**:
  - Two options: "Bar Chart" and "Tag Cloud"
  - Allows users to switch between visualization types
