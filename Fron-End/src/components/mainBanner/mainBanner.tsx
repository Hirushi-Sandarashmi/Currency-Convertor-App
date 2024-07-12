"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CircularProgress,
  Input,
} from "@nextui-org/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSession, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const revalidate = 0;

type CurrencyRates = {
  USD: number;
  AUD: number;
  LKR: number;
  IDR: number;
};

const initialDatax: CurrencyRates = {
  USD: 1,
  AUD: 1.4817,
  LKR: 304.39,
  IDR: 83.53,
};

export default function MainBanner() {
  const session = useSession();

  const [amount, setAmount] = useState("1");
  const [amountError, setAmountError] = useState<string | null>(null);
  const from = useRef("USD");
  const [to, setToValue] = useState<string>("LKR");
  const [convertedAmount, setConvertedAmount] = useState<string>("");

  const { data, isFetching, error } = useQuery({
    queryKey: ["currencyRate"],
    queryFn: async () => {
      const response = await fetch(
        "/api/currencyRate?" +
          new URLSearchParams({
            currencyType: from.current,
          }),
        {
          method: "GET",
        }
      );
      return await response.json();
    },
    staleTime: 5 * 60 * 1000,
  });

  const queryClient = useQueryClient();

  const updateBaseCurrency = (selectCurrency: string) => {
    from.current = selectCurrency;
    queryClient.invalidateQueries({
      queryKey: ["currencyRate"],
    });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (parseFloat(value) <= 0) {
      setAmountError("Amount must be greater than 0");
      setAmount("0");
    } else {
      setAmountError(null);
      setAmount(value);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!amount || parseFloat(amount) <= 0 || !to) {
      e.preventDefault();
      setAmountError("Amount must be greater than 0 or amount cannot be empty");
    } else {
      try {
        const response = await fetch("http://127.0.0.1:3001/api/transactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: convertedAmount,
            currency: to,
            userId: session.data?.id,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          window.location.href = "/records";
        }
      } catch (e) {
        toast.error("Error: Api not responding!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          transition: Bounce,
        });
      }
    }
  };

  useEffect(() => {
    if (amount && to) {
      setConvertedAmount(
        (
          parseFloat(amount) * (conversionRates[to as keyof CurrencyRates] || 0)
        ).toString()
      );
    }
  }, [amount, to]);

  const conversionRates = data?.conversion_rates || initialDatax;

  return (
    <div>
      <ToastContainer />
      {error ? (
        <div className="flex flex-col justify-center items-center">
          <h1>There was an error fetching the currency rate.</h1>
          <p>Please try again later.</p>
        </div>
      ) : isFetching ? (
        <div className="h-[400px] flex justify-center items-center  ">
          <CircularProgress className="mt-24" />
        </div>
      ) : (
        <div className="">
          <Card className="w-[600px]  h-[500px] -mt-2">
            <CardHeader className="flex justify-center bg-[#0266d9] p-6">
              <div className="font-bold text-xl">Currency Transfer App</div>
            </CardHeader>
            <CardBody>
              <div>
                <div>
                  <div className="flex mt-4">
                    <div className="w-[270px]">
                      <Input
                        type="number"
                        variant="underlined"
                        label="Enter Amount"
                        placeholder="100.00"
                        value={amount}
                        onChange={handleAmountChange}
                        id="inputAmount"
                        name="inputAmount"
                      />
                    </div>
                    <div className="w-[300px]">
                      <div className="flex w-[300px]">
                        <Autocomplete
                          variant="underlined"
                          placeholder="USD"
                          className="max-w-xs"
                          label="FROM"
                          selectedKey={from.current}
                          onSelectionChange={(e) => {
                            updateBaseCurrency(e?.toString() || "USD");
                          }}
                          isLoading={isFetching}
                          required
                        >
                          {Object.keys(conversionRates).map(
                            (d: string, i: number) => (
                              <AutocompleteItem key={d}>{d}</AutocompleteItem>
                            )
                          )}
                        </Autocomplete>
                      </div>
                      <div className="flex w-[300px] mt-4">
                        <Autocomplete
                          variant="underlined"
                          placeholder="Search an animal"
                          className="max-w-xs"
                          label="TO"
                          selectedKey={to}
                          onSelectionChange={(e) => {
                            setToValue(e?.toString() || "USD");
                          }}
                          isLoading={isFetching}
                          name="currency"
                          required
                        >
                          {Object.keys(conversionRates).map(
                            (ky: string, i: number) => (
                              <AutocompleteItem key={ky}>{ky}</AutocompleteItem>
                            )
                          )}
                        </Autocomplete>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-400/20 w-[200px] rounded-xl p-6 mt-4 ml-36 relative h-[100px] ">
                    <div className="flex w-[120px] items-center left-[50%] transform -translate-x-1/2 absolute mt-2 ">
                      <Input
                        type="number"
                        variant="underlined"
                        label=""
                        placeholder="=> Get Amount"
                        className="text-lg"
                        id="convertedCurrency"
                        name="amount"
                        value={convertedAmount}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="flex items-center w-300px] mt-2 ml-16">
                    {" "}
                    {amountError && (
                      <p className="text-red-600 ">{amountError}</p>
                    )}
                  </div>
                </div>
                <Button
                  color="primary"
                  variant="bordered"
                  type="submit"
                  className="p-8 rounded-none w-[580px] mt-4 "
                  onClick={handleSubmit}
                >
                  <div className="font-bold text-xl"> Transfer</div>
                </Button>
              </div>
            </CardBody>

            <CardFooter className=" flex justify-center text-white text-sm"></CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
