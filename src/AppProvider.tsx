import { useEffect, useState } from "react";
import { AppContext } from "./components/AppContext";
import axios from "axios";

export function AppProvider(props: object) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response: any) => {
        setData(response.data);
        console.log("response.data: ", response.data);
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(function () {
        setIsLoading(false);
      });
  }, []);

  const contextValue = {
    isLoading,
    data,
  };

  return <AppContext.Provider {...props} value={contextValue} />;
}
