import React, { PureComponent } from "react";
import Styles from "./index.module.less";
import { Col, Row } from "antd";
import StockList from "../../../components/StockList/index";
import { getRecommend } from "../../../services/apiStrategy";
import LoadingSpin from "../../../components/LoadingSpin/index";
import NavButton from "../components/NavButton";
import GeneralData from "../components/GeneralData";

class PageLogin extends PureComponent {
  state = {
    recommendStocks: undefined
  };

  async componentDidMount() {
    const recommendStocks = await getRecommend();
    this.setState({ recommendStocks });
  }

  render() {
    const { recommendStocks } = this.state;

    return (
      <div className={Styles.mainSection}>
        <Row gutter={40}>
          <Col md={16}>
            <div className={Styles.leftSection}>
              {recommendStocks ? (
                recommendStocks.stocks && recommendStocks.stocks.length > 0 ? (
                  <StockList recommend list={recommendStocks.stocks} />
                ) : (
                  <div>没有数据</div>
                )
              ) : (
                <LoadingSpin background={"blue"} />
              )}
            </div>
          </Col>
          <Col md={8}>
            <div>
              <NavButton />
              <div className={Styles.simpleSection}>
                {recommendStocks ? (
                  <GeneralData
                    todayBenefit={recommendStocks.todayBenefit}
                    yearBenefit={recommendStocks.yearBenefit}
                    risk={recommendStocks.risk}
                  />
                ) : (
                  undefined
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PageLogin;
