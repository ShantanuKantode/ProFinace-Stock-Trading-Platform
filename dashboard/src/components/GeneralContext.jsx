import React, {
  useState,
} from "react";

import BuyActionWindow from "./BuyActionWindow";

import SellActionWindow from "./SellActionWindow";


const GeneralContext =
  React.createContext({
    openBuyWindow: () => {},
    closeBuyWindow: () => {},

    openSellWindow: () => {},
    closeSellWindow: () => {},
  });


export const GeneralContextProvider =
  ({ children }) => {

    const [
      isBuyWindowOpen,
      setIsBuyWindowOpen,
    ] = useState(false);


    const [
      isSellWindowOpen,
      setIsSellWindowOpen,
    ] = useState(false);


    const [
      selectedStockUID,
      setSelectedStockUID,
    ] = useState("");


    const handleOpenBuyWindow =
      (uid) => {

        setIsBuyWindowOpen(true);

        setIsSellWindowOpen(false);

        setSelectedStockUID(uid);
      };


    const handleCloseBuyWindow =
      () => {

        setIsBuyWindowOpen(false);

        setSelectedStockUID("");
      };


    const handleOpenSellWindow =
      (uid) => {

        setIsSellWindowOpen(true);

        setIsBuyWindowOpen(false);

        setSelectedStockUID(uid);
      };


    const handleCloseSellWindow =
      () => {

        setIsSellWindowOpen(false);

        setSelectedStockUID("");
      };


    return (
      <GeneralContext.Provider
        value={{
          openBuyWindow:
            handleOpenBuyWindow,

          closeBuyWindow:
            handleCloseBuyWindow,

          openSellWindow:
            handleOpenSellWindow,

          closeSellWindow:
            handleCloseSellWindow,
        }}
      >

        {children}


        {isBuyWindowOpen && (
          <BuyActionWindow
            uid={
              selectedStockUID
            }
          />
        )}


        {isSellWindowOpen && (
          <SellActionWindow
            uid={
              selectedStockUID
            }
          />
        )}

      </GeneralContext.Provider>
    );
  };


export default GeneralContext;