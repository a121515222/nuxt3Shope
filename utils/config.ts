export const genderConfig = {
  male: {
    value: "male",
    showText: "男性"
  },
  female: {
    value: "female",
    showText: "女性"
  },
  other: {
    value: null,
    showText: "不透露"
  }
};

export const orderStatusConfig = {
  inProcessed: {
    value: "inProcessed",
    showText: "處理中"
  },
  shipped: {
    value: "shipped",
    showText: "已出貨"
  },
  completed: {
    value: "completed",
    showText: "已完成"
  },
  buyerCancelled: {
    value: "buyerCancelled",
    showText: "買家取消"
  },
  sellerCancelled: {
    value: "sellerCancelled",
    showText: "賣家取消"
  },
  confirmed: {
    value: "confirmed",
    showText: "已確認"
  },
  buyerGotProduct: {
    value: "buyerGotProduct",
    showText: "買家收到"
  }
};

export const paidMethodConfig = {
  creditCard: {
    value: "creditCard",
    showText: "信用卡"
  },
  transfer: {
    value: "transfer",
    showText: "轉帳"
  },
  cashOnDelivery: {
    value: "cashOnDelivery",
    showText: "貨到付款"
  }
};

export const productStatusConfig = {
  notListed: {
    value: "notListed",
    showText: "未上架"
  },
  listed: {
    value: "listed",
    showText: "已上架"
  },

  outOfStock: {
    value: "outOfStock",
    showText: "缺貨中"
  },
  restocking: {
    value: "restocking",
    showText: "補貨中"
  },
  onSale: {
    value: "onSale",
    showText: "促銷中"
  },
  pendingRemoval: {
    value: "pendingRemoval",
    showText: "待下架"
  }
};
