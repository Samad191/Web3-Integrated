import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { FortmaticConnector } from "@web3-react/fortmatic-connector";

import { injected } from "../utils/web3Connectors";
import { getErrorMessage } from "../utils/walletConnectFunctions";

export function useEagerConnect() {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  }, []); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}

export const useActivateWallet = () => {
  const { activate } = useWeb3React();
  return async (connector, onClose = () => { }) => {
    try {
      if (
        connector instanceof WalletConnectConnector &&
        connector.walletConnectProvider?.wc?.uri
      ) {
        connector.walletConnectProvider = undefined;
      } else if (connector instanceof FortmaticConnector) {
        onClose();
      }
      await activate(connector ? connector : injected, undefined, true);
      onClose();
    } catch (e) {
      // console.log(getErrorMessage(e));
    }
  };
};
