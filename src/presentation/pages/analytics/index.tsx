import React, { useEffect } from "react";
import { Card, Col, Row, Spin, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/modules/auth";
import { UserRole } from "@/modules/auth/domain/enums";
import { TopRecipientsChart } from "../../organisms/analytics/TopRecipientsChart";

const { Title } = Typography;

export const AnalyticsPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Check user role for access control
  useEffect(() => {
    if (user && user.role !== UserRole.ADMIN && user.role !== UserRole.LEAD) {
      navigate("/unauthorized");
    }
  }, [user, navigate]);

  if (!user) {
    return <Spin size="large" />;
  }

  return (
    <div className="analytics-dashboard">
      <Title level={2}>Analytics Dashboard</Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card title="Top Recipients" bordered={false}>
            <TopRecipientsChart />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Top Teams" bordered={false}>
            {/* TopTeamsChart will be implemented next */}
            <div
              style={{
                height: 300,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spin /> <span style={{ marginLeft: 12 }}>Coming soon</span>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Trending Categories" bordered={false}>
            {/* TrendingCategoriesChart will be implemented next */}
            <div
              style={{
                height: 300,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spin /> <span style={{ marginLeft: 12 }}>Coming soon</span>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Trending Keywords" bordered={false}>
            {/* TrendingKeywordsChart will be implemented next */}
            <div
              style={{
                height: 300,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spin /> <span style={{ marginLeft: 12 }}>Coming soon</span>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AnalyticsPage;
