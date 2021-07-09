/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from 'react';
import vi from 'date-fns/locale/vi';
import DatePicker, { registerLocale } from 'react-datepicker';
import { connect } from 'react-redux';
import * as Icons from 'pages/maintenancecard/commons/Icons';
import { default_option, default_status_work, default_status_work_detail, default_status_payment, default_status_payment_detail } from 'pages/maintenancecard/commons/mainCardConstants.js';
import '../styles/filterMainCardModal.scss';
import { fetchMainCard, showFilter } from '../../../../../actions/mainCard';

registerLocale('vi', vi);
function FilterMainCardsModal(props) {
  const { filterInfo, showFilter } = props;
  const [listOption, setListOption] = useState([]);
  const [statusWork, setStatusWork] = useState('');
  const [statusPayment, setStatusPayment] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [focusEndDate, setFocusEndDate] = useState(true);
  const [focusStartDate, setFocusStartDate] = useState(true);
  const myRef = useRef();
  const calendar1 = useRef();
  const calendar2 = useRef();

  useEffect(() => {
    if (filterInfo
      && filterInfo.selectedFilter
      && filterInfo.selectedFilter.length > 0
    ) {
      setListOption(filterInfo.selectedFilter);
      setStatusWork(filterInfo.statusWork);
      setStatusPayment(filterInfo.statusPayment);
      setEndDate(filterInfo.endDate);
      setStartDate(filterInfo.startDate);
    }
  }, []);

  useEffect(() => {
    if (!props.filterInfo.showFilter) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  const handleClickOutside = e => {
    if (!myRef.current.contains(e.target)) {
      onShowFilter();
    }
  };

  const onShowFilter = () => {
    showFilter(!props.filterInfo.showFilter);
  };

  const getOptionName = (option) => {
    if (option === 'select') {
      return 'Chọn điều kiện lọc';
    }
    if (option === 'statusWork') {
      return 'Trạng thái công việc';
    }
    if (option === 'statusPayment') {
      return 'Trạng thái thanh toán';
    }
    if (option === 'date') {
      return 'Thời gian trả xe';
    }
    return null;
  };

  const getUnSelectedOption = () => {
    const list_un_selected_option = [];
    if (listOption.length === 0) {
      return default_option;
    }
    if (listOption.length === default_option.length) {
      return list_un_selected_option;
    }
    for (let i = 0; i < default_option.length; i++) {
      let exist = false;
      for (let j = 0; j < listOption.length; j++) {
        if (default_option[i] === listOption[j]) {
          exist = true;
          break;
        }
      }
      if (!exist) {
        list_un_selected_option.push(default_option[i]);
      }
    }
    return list_un_selected_option;
  };

  const getLastUnSelectedOption = () => {
    const list_un_selected_option = getUnSelectedOption();
    const last_un_selected_option = ['select'];
    for (let index = 0; index < list_un_selected_option.length; index++) {
      last_un_selected_option.push(list_un_selected_option[index]);
    }
    return last_un_selected_option;
  };

  const onSelectOption = (option) => {
    if (option === 'select') return;
    const new_list_option = [...listOption];
    let exist = false;
    for (let index = 0; index < new_list_option.length;) {
      if (new_list_option[index] === option) {
        new_list_option.splice(index, 1);
        if (option === 'statusWork') {
          setStatusWork('');
        }
        if (option === 'statusPayment') {
          setStatusPayment('');
        }
        if (option === 'date') {
          setEndDate('');
          setStartDate('');
        }
        exist = true;
        break;
      } else {
        index++;
      }
    }
    if (!exist) {
      new_list_option.push(option);
    }
    setListOption(new_list_option);
  };

  const onChangeOption = (newOption, oldOption) => {
    const old_list_option = [...listOption];
    const new_list_option = [];
    for (let index = 0; index < old_list_option.length; index++) {
      if (old_list_option[index] === oldOption) {
        new_list_option.push(newOption);
      } else {
        new_list_option.push(old_list_option[index]);
      }
    }
    setListOption(new_list_option);
  };

  // Action when click 'Lọc'
  const filter = () => {
    const selectedFilter = [];
    for (let i = 0; i <= listOption.length; i++) {
      const option = listOption[i];
      if (
        option === 'statusWork'
      ) {
        selectedFilter.push(option);
      }
      if (
        option === 'statusPayment'
      ) {
        selectedFilter.push(option);
      }
      if (
        option === 'date'
      ) {
        selectedFilter.push(option);
      }
    }
    const afterInfo = {
      selectedFilter,
      filterText: props.filterInfo.filterText,
      statusWork,
      statusPayment,
      endDate,
      startDate,
    };
    props.fetchMainCard(afterInfo);
  };

  const showDropdownSource = () => {
    setShowDropdownBranch(!showDropdownBranch);
    document.addEventListener('click', closeDropdownSource, true);
  };
  const closeDropdownSource = (e) => {
    if (!e || !e.target) return;
    if (e.target.id === 'button-source-dropdown') return;
    if (
      e.target.className.baseVal === 'svg3636'
      || (!e.target.className.includes('dropdown-item-delivery-collations-filter')
        && !e.target.className.includes('checkbox')
        && !e.target.className.includes('Checkbox'))
    ) {
      setShowDropdownBranch(false);
      document.removeEventListener('click', closeDropdownSource, true);
    }
  };

  const showFilterOption = (list_option, select) => {
    let elmFO = null;
    if (list_option[0] === 'select') {
      elmFO = list_option.map((option, index) => {
        return (
          <a
            className="dropdown-item delivery-collations-dropdown-item"
            key={index}
            onClick={() => onSelectOption(option)}
          >
            {getOptionName(option)}
          </a>
        );
      });
    } else {
      list_option.push(select);
      elmFO = list_option.map((option, index) => {
        return (
          <a
            className="dropdown-item delivery-collations-dropdown-item"
            key={index}
            onClick={() => onChangeOption(option, select)}
          >
            {getOptionName(option)}
          </a>
        );
      });
    }
    return (
      <div className="filter-delivery-collations-option">
        <button
          type="button"
          className="dropdown-toggle delivery-collations-dropdown-button"
          data-toggle="dropdown"
        >
          {getOptionName(select)}
          <Icons.Arrow />
        </button>
        <div className="dropdown-menu delivery-collations-dropdown-menu">{elmFO}</div>
      </div>
    );
  };

  // const getFilterByBranchText = (listBranch) => {
  //   if (listBranch.length === 1) {
  //     return listBranch[0].label;
  //   }
  //   if (selectedLocation.length === 1) {
  //     for (let i = 0; i < listBranch.length; i++) {
  //       if (listBranch[i].id === selectedLocation[0]) {
  //         return listBranch[i].label;
  //       }
  //     }
  //     return '1 chi nhánh';
  //   }
  //   if (selectedLocation.length === listBranch.length) {
  //     return `Tất cả chi nhánh (${listBranch.length})`;
  //   }
  //   if (selectedLocation.length === 0) {
  //     return 'Chọn chi nhánh';
  //   }
  //   return `${selectedLocation.length} chi nhánh`;
  // };

  // const selectBranch = (id) => {
  //   setSelectedLocation(() => (
  //     selectedLocation.includes(id)
  //       ? selectedLocation.filter((item) => item !== id)
  //       : selectedLocation.concat(id)
  //   ));
  // };


  const selectStatusWork = (a) => {
    const tmp = a;
    if (statusWork === tmp) {
      setStatusWork('');
    } else {
      setStatusWork(tmp);
    }
  };

  const selectStatusPayment = (a) => {
    const tmp = a ;
    if (statusPayment === tmp) {
      setStatusPayment('');
    } else {
      setStatusPayment(tmp);
    }
  };

  const onClickFocusEndDate = () => {
    setFocusEndDate(!focusEndDate);
    calendar2.current.setOpen(focusEndDate);
  };

  const onClickFocusStartDate = () => {
    setFocusStartDate(!focusStartDate);
    calendar2.current.setOpen(focusStartDate);
  };


  const renderShowOption = (option) => {
    if (option === 'date') {
      return (
        <div>
          <div id="old-order-prepayment-datetime">
            <DatePicker
              closeOnScroll
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              dateFormat="dd/MM/yyyy"
              endDate={endDate}
              placeholderText="Từ ngày"
              locale="vi"
              ref={calendar1}
            />
            <span className="icon-calendar" onClick={onClickFocusStartDate}>
              <Icons.IconCalendar />
            </span>
          </div>
          <div
            id="old-order-prepayment-datetime"
            style={{ marginTop: '10px' }}
          >
            <DatePicker
              closeOnScroll
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="Đến ngày"
              dateFormat="dd/MM/yyyy"
              locale="vi"
              ref={calendar2}
            />
            <span className="icon-calendar" onClick={onClickFocusEndDate}>
              <Icons.IconCalendar />
            </span>
          </div>
        </div>
      );
    }

    if (option === 'statusWork') {
      const list_button_work = default_status_work.map((a, index) => {
        return (
          <button
            key={index}
            className={`filter-delivery-collations-button ${statusWork === index ? 'active' : null}`}
            onClick={() => selectStatusWork(index)}
            type="button"
          >
            {default_status_work_detail[index]}
          </button>
        );
      });
      return (
        <div className="filter-delivery-collations-detail">
          {list_button_work}
        </div>
      );
    }

    if (option === 'statusPayment') {
      const list_button = default_status_payment.map((a, index) => {
        return (
          <button
            key={index}
            className={`filter-delivery-collations-button ${statusPayment === index ? 'active' : null}`}
            onClick={() => selectStatusPayment(index)}
            type="button"
          >
            {default_status_payment_detail[index]}
          </button>
        );
      });
      return (
        <div className="filter-delivery-collations-detail">
          {list_button}
        </div>
      );
    }

    return null;
  };

    // Filter-Row bao gồm 'Chọn điều kiện lọc' + 'Chi tiết 1 bộ lọc'
  const showFilterRow = (option) => {
    const options = getUnSelectedOption();
    return (
      <div className="filter-delivery-collations-line" style={{ display: 'flex' }}>
        {showFilterOption(options, option)}
        {renderShowOption(option)}
        <div
          className="filter-delivery-collations-bin"
          onClick={() => onSelectOption(option)}
        >
          <Icons.Bin />
        </div>
      </div>
    );
  };

    // Filter-Wrapper bao gồm nhiều Filter-row
  const showFilterWrapper = () => {
    const elmFW = listOption.map((option, index) => {
      return <div key={index}>{showFilterRow(option)}</div>;
    });
    return elmFW;
  };

  const last_filter_option = getLastUnSelectedOption();
  return (
    <div id="filter-delivery-collations-modal-wrapper" ref={myRef}>
      <div id="filter-delivery-collations-modal-header">Hiển thị đơn hàng theo</div>
      <div id="filter-delivery-collations-modal-body">
        {showFilterWrapper()}
        {last_filter_option.length !== 1 ? (
          <div className="filter-delivery-collations-line">
            {showFilterOption(last_filter_option, 'select')}
          </div>
        ) : null}
      </div>
      <div id="filter-delivery-collations-modal-footer">
        <button
          type="button"
          id="filter-delivery-collations-modal-action"
          onClick={() => filter()}
        >
            Lọc
        </button>
      </div>
    </div>
  );
}
FilterMainCardsModal.defaultProps = {
};
const mapStateToProps = (state) => {
  const {
    mainCard: { filterInfo },
  } = state;
  return {
    filterInfo,
  };
};

const mapDispatchToProps = (dispatch) => ({
  showFilter: (show) => dispatch(showFilter(show)),
  fetchMainCard: (filter, page) => dispatch(fetchMainCard(filter, page))
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterMainCardsModal);
