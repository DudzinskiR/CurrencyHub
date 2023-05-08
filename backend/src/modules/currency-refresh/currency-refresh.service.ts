import CurrencyRefreshModel from "./currency-refresh.model";

class CurrencyRefreshService {
  static async isDataOld(currencyCode: string) {
    const res = await CurrencyRefreshModel.getLastCurrencyRefresh(currencyCode);
    if(!res){
      return true;
    } else {
      return res.time.getDate() - new Date().getDate() < 0
    }
  }
}

export default CurrencyRefreshService;