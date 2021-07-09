import * as actionTypes from "actions/actionTypes";
import { API_MAINTENANCECARD, API_CUSTOMER } from "constants/api";
import { fetch } from "utils/fetchMiddleware";
import { toastError } from "../../../utils/toast";

export const showFilter = (show) => ({
  type: actionTypes.SHOW_MAIN_CARD_FILTER,
  show,
});

export const fetchMainCard = (_filterInfo, page) => (dispatch, getState) => {
  const {
    mainCard: { filterInfo },
  } = getState();
  const filter = _filterInfo || filterInfo;
  dispatch(updateMainCardFetching(true));
  dispatch(filterMainCard(filter, page))
    .then((json) => {
      const { maintenance_cards, metadata } = json;
      const { limit, page, total } = metadata;
      if (maintenance_cards.length === 0) {
        dispatch(getMainCards(maintenance_cards, page, limit, total));
        dispatch(updateMainCardFetching(false));
        dispatch(updateMainCardIsEmpty(true));
      } else {
        dispatch(getMainCards(maintenance_cards, page, limit, total));
        dispatch(updateMainCardFetching(false));
        dispatch(updateMainCardIsEmpty(false));
      }
    })
    .catch((e) => {
      toastError("Có lỗi xảy ra khi lấy danh sách phiếu");
      return;
    });
};

export const filterMainCard = (filterInfo, page) => (dispatch) => {
  dispatch({
    type: actionTypes.CHANGE_MAIN_CARD_FILTER_INFO,
    filterInfo,
  });
  dispatch(showFilter(false));
  return dispatch(fetchFilterMainCard(filterInfo, page)).then((json) => {
    return json;
  });
};

export const fetchFilterMainCard =
  (filterInfo, page = 1) =>
  (dispatch, getState) => {
    let filterField = "";
    filterField = `${filterField}&page=${page}`;
    filterField = `${filterField}&limit=10`;
    if (filterInfo.statusPayment !== null) {
      filterField = `${filterField}&payStatus=${filterInfo.statusPayment}`;
    }
    if (filterInfo.statusWork !== null) {
      filterField = `${filterField}&workStatus=${filterInfo.statusWork}`;
    }
    if (filterInfo.endDate && filterInfo.startDate) {
      const startDate = new Date(filterInfo.startDate).getTime() / 1000;
      filterField = `${filterField}&from=${startDate}`;

      const endDate =
        (new Date(filterInfo.endDate).getTime() + 86400000) / 1000;
      filterField = `${filterField}&to=${endDate}`;
    }

    filterField = `${filterField}&query=${
      filterInfo.filterText
        ? encodeURIComponent(filterInfo.filterText.trim())
        : ""
    }`;
    return dispatch(
      fetch(`${API_MAINTENANCECARD}/maintenance_cards_v2?${filterField}`, {
        method: "GET",
      })
    )
      .then((json) => {
        return json;
      })
      .catch((e) => {
        return e;
      });
  };

export const getMainCardById = (id) => (dispatch, getState) => {
  return dispatch(fetch(`${API_MAINTENANCECARD}/maintenanceCards/${id}`))
    .then((json) => {
      if (json) {
        // dispatch(getMainCard(json));
      }
      return json;
    })
    .catch((e) => {
      return e;
    });
};

export const getVehiclesByCustomerId = (id) => (dispatch, getState) => {
  return dispatch(fetch(`${API_CUSTOMER}/vehicles/${id}`))
    .then((json) => {
      if (json) return json;
    })
    .catch((e) => {
      return e;
    });
};

export const mainCardPaymentHistory =
  (paymentHistoryDTOs) => (dispatch, getState) => {
    const endpoint = `${API_MAINTENANCECARD}/paymentHistories`;
    return dispatch(
      fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(paymentHistoryDTOs),
      })
    )
      .then((json) => {
        return json;
      })
      .catch((e) => {
        console.error(e);
        return e;
      });
  };

export const updateMainCard =
  (id, mainCard = {}) =>
  (dispatch, getState) => {
    const endpoint = `${API_MAINTENANCECARD}/maintenanceCards/${id}`;
    return dispatch(
      fetch(endpoint, {
        method: "PUT",
        body: JSON.stringify(mainCard),
      })
    )
      .then((json) => {
        return json;
      })
      .catch((e) => {
        console.error(e);
        return e;
      });
  };

export const deleteMainCard =
  (ids = []) =>
  (dispatch, getState) => {
    const endpoint = `${API_MAINTENANCECARD}/maintenanceCards/deletes?ids=${ids}`;
    return dispatch(
      fetch(endpoint, {
        method: "DELETE",
      })
    )
      .then((json) => {
        return json;
      })
      .catch((e) => {
        console.error(e);
        return e;
      });
  };

export const updateStatusMaintenanceCardDetail =
  (id) => (dispatch, getState) => {
    const endpoint = `${API_MAINTENANCECARD}/maintenanceCardDetails/status/${id}`;
    return dispatch(
      fetch(endpoint, {
        method: "PUT",
      })
    )
      .then((json) => {
        return json;
      })
      .catch((e) => {
        console.error(e);
        return e;
      });
  };

export const saveMainCard =
  (cardMain = {}) =>
  (dispatch, getState) => {
    const endpoint = `${API_MAINTENANCECARD}/maintenanceCards`;
    return dispatch(
      fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(cardMain),
      })
    )
      .then((json) => {
        return json;
      })
      .catch((e) => {
        console.error(e);
        return e;
      });
  };

  export const updateStatusMCDetails = (id) => (dispatch) => {
    const endpoint = `${API_MAINTENANCECARD}/maintenanceCards/work_status/${id}`;
    return dispatch(
      fetch(endpoint, {
        method: "PUT",
      })
    )
      .then((json) => {
        return json;
      })
      .catch((e) => {
        console.error(e);
        return e;
      });
  };

export const getMainCard = (customer) => ({
  type: actionTypes.RECEIVE_MAIN_CARD,
  customer,
});

export const getMainCards = (
  maintenancecards,
  currentPage,
  totalItems,
  totalPages
) => ({
  type: actionTypes.RECEIVE_MAIN_CARDS,
  maintenancecards,
  currentPage,
  totalItems,
  totalPages,
});

export const updateMainCardIsEmpty = (bool) => ({
  type: actionTypes.MAIN_CARD_IS_EMPTY,
  bool,
});

export const updateMainCardFetching = (bool) => ({
  type: actionTypes.MAIN_CARD_FETCHING,
  bool,
});

export const customerIsValid = (status) => ({
  type: "CUSTOMER_VALID",
  status,
});

export const serviceIsValid = (status) => ({
  type: "SERVICE-VALID",
  status,
});

export const maintenanceCardIsValid = (status) => ({
  type: "MAINTENAN-CARD-VALID",
  status,
});

export const clearValid = () => ({
  type: "CLEAR-VALID",
});

export const addMainCardSocket = (item) => ({
  type: actionTypes.ADD_MAIN_CARD_SOCKET,
  item,
});

export const updateTotalMainCardForStaff = (id) => ({
  type: "UPDATE_TOTAL_MAINTENANCE_CARD",
  id,
});
