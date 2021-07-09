import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getCustomerById } from '../../actions/customerAction';
import CustomerDetailInfo from './CustomerDetailInfo/CustomerDetailInfo';
import { useParams } from "react-router-dom";
import './styles.scss';
import TitleAndAction from './TitleAndAction/TitleAndAction';
import HistoryMainCardList from './HistoryMainCard/HistoryMainCardList';
function CustomerDetail(props) {
  const { id } = useParams();
  const { customer, onGetCustomerById } = props;
  useEffect(() => {
    if (id) {
      onGetCustomerById(id);
    }
  }, []);
  return (
    <div className="customer-screen-wrapper-detail">
        <TitleAndAction  customer={customer}/>
        <CustomerDetailInfo customer={customer} />
        <HistoryMainCardList customer={customer}/>
    </div>
  );
}
CustomerDetail.defaultProps = {

};
const mapStateToProps = (state) => {
  const {
    customer: { customer }
  } = state
  return {
    customer,
  }
}

const mapDispatchToProps = (dispatch) => ({
  onGetCustomerById: (id) => dispatch(getCustomerById(id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerDetail));
