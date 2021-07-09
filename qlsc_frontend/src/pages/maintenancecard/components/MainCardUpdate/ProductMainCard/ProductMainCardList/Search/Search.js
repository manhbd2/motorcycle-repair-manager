import React, { useState, useRef, useEffect } from "react";
import Input from "components/input/Input";
import debounce from "utils/debounce";
import "./styles.scss";
import { connect } from "react-redux";
import OrderListSearch from "./OrderListSearch/OrderListSearch";
import * as Icons from "pages/maintenancecard/commons/Icons";
import { getFilterProductService } from "../../../../../../product/actions/ProductAction";

let timeOut;
function Search(props) {
  const [search, setSearch] = useState("");
  const [focus, setFocus] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [list, setList] = useState([]);
  const [metaData, setMetaData] = useState({});
  useEffect(() => {
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  const onChangeText = (e) => {
    e.persist();
    setSearch(e.target.value);
    onSearch(e.target.value);
  };
  const inputRef = useRef();

  const debounceScroll = debounce((e) => {
    onScroll(e, false);
  }, 500);

  const onSearch = (value) => {
    setFetching(true);
    setList([]);
    setMetaData({});
    setSearch(value);
    debounceSearch(value, true, 1);
  };

  const onFocus = () => {
    if (!props.finish) {
      setFetching(true);
      getListProductAction(search || "", undefined, 1);
      setFocus(true);
    }
  };

  const onBlur = () => {
    setTimeout(() => {
      setList([]);
      setMetaData({});
      setFocus(false);
      setFetching(true);
    }, 0);
  };

  const debounceSearch = debounce((value, reset, p) => {
    getListProductAction(value, reset, p);
  }, 400);

  const getListProductAction = (s, reset, p) => {
    const option = {};
    option.page = p;
    props.getFilterProducts(search, option).then((json) => {
      setFetching(false);
      if (json && json.productServices) {
        const { productServices, currentPage, totalItems, totalPage } = json;
        const temp = {};
        temp.page = currentPage;
        temp.total = totalPage;
        const newOrder = productServices;
        setMetaData(temp);
        if (reset) {
          setList([...newOrder]);
        } else {
          setList(list.concat([...newOrder]));
        }
      }
    });
  };

  const onScroll = (e) => {
    if (
      e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight <=
      500
    ) {
      if (metaData.page < metaData.total) {
        getListProductAction(search, false, metaData.page + 1);
      }
    }
  };

  const renderSearch = () => {
    return (
      <div className="position-absolute product-list-search-wrapper">
        <div
          className="list-item-search"
          onScroll={(e) => {
            e.persist();
            e.stopPropagation();
            debounceScroll(e);
          }}
        >
          <OrderListSearch
            onClick={(item) => {
              props.addProduct(item);
              setSearch("");
            }}
            list={list}
            fetching={fetching}
            setShowFilterProduct={(a) => props.setShowFilterProduct(a)}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="d-flex align-items-center justify-content-between position-relative search-product-container">
      <div className="position-relative search-wrapper">
        <Input
          onChange={(e) => onChangeText(e)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeHolder="Tìm kiếm dịch vụ theo mã dịch vụ hoặc tên dịch vụ"
        />
      </div>
      {focus ? renderSearch() : null}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getFilterProducts: (search, page) =>
    dispatch(getFilterProductService(search, page)),
});
export default connect(null, mapDispatchToProps)(Search);
