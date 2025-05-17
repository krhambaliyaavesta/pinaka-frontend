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

## Implementation Blueprint

This section outlines a step-by-step plan for implementing the analytics feature following the project's Clean Architecture principles and Atomic Design methodology.

### Phase 1: Foundation and Infrastructure

#### Step 1.1: Set up Analytics Module Structure

- Create the analytics module structure following Clean Architecture
- Set up domain, application, and infrastructure layers
- Define base interfaces and types

#### Step 1.2: Install Required Dependencies

- Add Recharts to the project
- Set up any other required libraries

#### Step 1.3: Create Analytics Repository Interface and Implementation

- Define the repository interface in the domain layer
- Implement the repository in the infrastructure layer
- Set up API client for analytics endpoints

#### Step 1.4: Implement Role-Based Access Control

- Integrate with existing auth module for role verification
- Create route guard component for admin/lead roles

### Phase 2: Core Services and Use Cases

#### Step 2.1: Implement Top Recipients Service

- Create domain entities for recipients data
- Implement application service and use cases
- Set up API integration

#### Step 2.2: Implement Top Teams Service

- Create domain entities for teams data
- Implement application service and use cases
- Set up API integration

#### Step 2.3: Implement Trending Categories Service

- Create domain entities for categories data
- Implement application service and use cases
- Set up API integration

#### Step 2.4: Implement Trending Keywords Service

- Create domain entities for keywords data
- Implement application service and use cases
- Set up API integration

#### Step 2.5: Create Analytics Module Factory

- Implement the module factory following the pattern
- Set up dependency injection
- Create singleton instances for repositories and services

### Phase 3: UI Components - Atoms and Molecules

#### Step 3.1: Create Common Filter Components

- Build period selector component (weekly, monthly, yearly)
- Build limit selector component
- Build view toggle component

#### Step 3.2: Create Chart Base Components

- Build base horizontal bar chart component
- Build base pie chart component
- Build base bubble chart component
- Build base tag cloud component

#### Step 3.3: Create Loading and Error States

- Build loading indicator component
- Build error message component
- Implement retry functionality

### Phase 4: UI Components - Organisms and Templates

#### Step 4.1: Build Top Recipients Visualization

- Implement horizontal bar chart with recipient data
- Add interactive features and tooltips
- Create view toggle functionality

#### Step 4.2: Build Top Teams Visualization

- Implement pie chart with team data
- Add interactive features and tooltips
- Create view toggle functionality

#### Step 4.3: Build Trending Categories Visualization

- Implement bubble chart with category data
- Add interactive features and tooltips
- Create view toggle functionality

#### Step 4.4: Build Trending Keywords Visualization

- Implement bar chart with keyword data
- Add interactive features and tooltips
- Create view toggle functionality

#### Step 4.5: Create Analytics Dashboard Layout

- Design and implement dashboard grid layout
- Ensure responsive behavior
- Add section titles and context information

### Phase 5: Pages and Integration

#### Step 5.1: Create Analytics Page

- Build the main analytics page
- Integrate all visualizations
- Implement layout for different screen sizes

#### Step 5.2: Add Navigation and Routing

- Update app navigation to include analytics link
- Set up routing with role-based protection
- Add breadcrumbs for navigation

#### Step 5.3: Implement Data Refresh and Sync

- Add manual refresh functionality
- Implement auto-refresh options
- Ensure consistent data across visualizations

#### Step 5.4: End-to-End Testing and Refinement

- Test all visualizations with real data
- Verify role-based access restrictions
- Refine responsive behavior
- Optimize performance

## Iterative Implementation Plan

The analytics feature will be implemented in small, incremental steps following the principles of iterative development. Each step builds upon the previous one and delivers a working, testable piece of functionality.

### Iteration 1: Core Module Setup

1. Create analytics module structure
2. Set up basic interfaces and types
3. Install Recharts library
4. Implement API client for analytics endpoints

### Iteration 2: Top Recipients Feature

1. Implement repository and service for Top Recipients
2. Create basic bar chart component for recipient data
3. Build filter components (period, limit)
4. Create simple view toggle

### Iteration 3: Analytics Dashboard Shell

1. Create analytics page with role protection
2. Implement basic layout structure
3. Add navigation and routing
4. Add loading and error states

### Iteration 4: Top Teams Feature

1. Implement repository and service for Top Teams
2. Create pie chart component
3. Integrate with dashboard
4. Connect filters and toggles

### Iteration 5: Trending Categories Feature

1. Implement repository and service for Categories
2. Create bubble chart visualization
3. Integrate with dashboard
4. Connect filters and toggles

### Iteration 6: Trending Keywords Feature

1. Implement repository and service for Keywords
2. Create bar chart visualization
3. Integrate with dashboard
4. Connect filters and toggles

### Iteration 7: UI Polish and Refinement

1. Enhance interactivity and tooltips
2. Improve responsive behavior
3. Add animations and transitions
4. Refine color schemes and visual hierarchy

### Iteration 8: Testing and Finalization

1. End-to-end testing with real data
2. Performance optimization
3. Accessibility improvements
4. Final bug fixes and refinements

## Implementation Prompts

The following prompts can be used with a code-generation LLM to guide the implementation of each step of the analytics feature.

### Prompt 1: Setup Analytics Module Structure

```
Create the foundation for an analytics module following Clean Architecture principles in our Next.js React application. We need to implement:

1. Create the basic module structure with domain, application, and infrastructure layers
2. Define interfaces for analytics repositories in the domain layer
3. Set up types for the API responses for our four endpoints:
   - Get Top Recipients
   - Get Top Teams
   - Get Trending Categories
   - Get Trending Keywords

The responses follow this general structure:
{
  "status": "success",
  "data": [
    {
      // Specific fields for each endpoint
    }
  ]
}

Follow our project's existing patterns for module organization and ensure all exports are properly set up for dependency injection via the Module Factory pattern.
```

### Prompt 2: Install and Configure Recharts

```
We need to add the Recharts library to our Next.js project for data visualization. The steps are:

1. Add Recharts to package.json dependencies
2. Create a simple test component to verify the installation
3. Set up some basic styled chart components we can reuse:
   - A horizontal bar chart base component
   - A pie chart base component
   - A scatter/bubble chart base component

Each component should:
- Accept data in a standardized format
- Support responsive sizing
- Allow customization of colors and styles
- Include basic tooltips

Follow our project's Atomic Design methodology and place these components in the appropriate atoms/molecules directories.
```

### Prompt 3: Implement Analytics Repository

```
Create an analytics repository implementation that will handle API requests to our analytics endpoints. The implementation should:

1. Use the repository interface defined in the domain layer
2. Handle API requests to all four analytics endpoints:
   - Get Top Recipients
   - Get Top Teams
   - Get Trending Categories
   - Get Trending Keywords
3. Support query parameters for:
   - period (weekly, monthly, yearly)
   - limit (varying by endpoint)
4. Map API responses to our domain entities
5. Handle error cases appropriately

Follow the existing patterns for API clients and repositories in our project, and ensure the implementation can be easily injected via our Module Factory pattern.
```

### Prompt 4: Create Analytics Module Factory

```
Implement the Analytics Module Factory following our Module Factory pattern. The factory should:

1. Provide access to all analytics repositories, services, and use cases
2. Manage singleton instances for repositories and services
3. Handle proper dependency injection throughout the module
4. Include appropriate error handling utilities

The factory will need to create and manage:
- AnalyticsRepository instance
- Service instances for each analytics feature
- Use Case instances for each analytics operation

Follow the same pattern as our existing module factories (like AuthModule) and ensure all dependencies are properly injected.
```

### Prompt 5: Build Filter Components

```
Create reusable filter components for our analytics dashboard following our Atomic Design principles. Implement:

1. A PeriodSelector component with options for Weekly, Monthly, and Yearly
2. A LimitSelector component that accepts different limit options (configurable)
3. A ViewToggle component that can toggle between two different visualization types

Each component should:
- Accept a current value and an onChange handler
- Use our project's design system and styling
- Be responsive and accessible
- Include appropriate TypeScript typing

These components will be shared across all four analytics visualizations, so ensure they're built to be reusable and placed in the appropriate atoms/molecules directories.
```

### Prompt 6: Create Top Recipients Component

```
Implement the Top Recipients visualization component using our Recharts bar chart base. The component should:

1. Accept data from the Top Recipients endpoint
2. Display recipients in a horizontal bar chart by default
3. Include filter components for period and limit selection
4. Support toggling between bar chart and pie chart views
5. Handle loading and error states
6. Include tooltips with detailed information

Use our project's Atomic Design methodology to organize the component hierarchy:
- Atoms/molecules for chart elements
- An organism for the complete visualization with filters
- Proper TypeScript typing for all props and data

Ensure the component works with the data structure provided by our API and properly handles empty data cases.
```

### Prompt 7: Create Analytics Dashboard Page

```
Create the main Analytics Dashboard page component that will integrate all four visualizations. The page should:

1. Be accessible only to users with admin or lead roles
2. Include a responsive grid layout for the four visualization components:
   - Top Recipients
   - Top Teams
   - Trending Categories
   - Trending Keywords
3. Handle page-level loading and error states
4. Include page title and description

Integrate with our authentication system to enforce role-based access and follow our project's page structure patterns. Add the necessary routing configuration to make the page accessible at /analytics.
```

### Prompt 8: Implement Top Teams Component

```
Implement the Top Teams visualization component using our Recharts pie chart base. The component should:

1. Accept data from the Top Teams endpoint
2. Display teams in a pie chart by default
3. Include filter components for period and limit selection
4. Support toggling between pie chart and bar chart views
5. Handle loading and error states
6. Include tooltips with detailed information

Use our project's Atomic Design methodology to organize the component hierarchy and ensure the component works with the data structure provided by our API.
```

### Prompt 9: Implement Trending Categories Component

```
Implement the Trending Categories visualization component using our Recharts bubble chart base. The component should:

1. Accept data from the Trending Categories endpoint
2. Display categories as bubbles with size proportional to count
3. Include filter components for period and limit selection
4. Support toggling between bubble chart and tree map views
5. Handle loading and error states
6. Include tooltips with detailed information

Use our project's Atomic Design methodology to organize the component hierarchy and ensure the component works with the data structure provided by our API.
```

### Prompt 10: Implement Trending Keywords Component

```
Implement the Trending Keywords visualization component using our Recharts bar chart base. The component should:

1. Accept data from the Trending Keywords endpoint
2. Display keywords in a horizontal bar chart by default
3. Include filter components for period and limit selection
4. Support toggling between bar chart and tag cloud views
5. Handle loading and error states
6. Include tooltips with detailed information

Use our project's Atomic Design methodology to organize the component hierarchy and ensure the component works with the data structure provided by our API.
```

### Prompt 11: Finalize Dashboard Integration

```
Finalize the integration of all components in the Analytics Dashboard:

1. Ensure consistent styling across all visualizations
2. Implement synchronized filter states where appropriate
3. Add a global refresh button to update all visualizations
4. Optimize loading patterns to improve perceived performance
5. Add appropriate animations and transitions between states
6. Ensure responsive behavior across all screen sizes

Test the dashboard with various data scenarios and ensure all components work together harmoniously. Verify that role-based access is functioning correctly.
```
