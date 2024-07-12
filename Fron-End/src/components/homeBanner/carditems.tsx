"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";

interface Country {
  iconUrl: string;
  name: string;
  value: string;
}

const countries: Country[] = [
  {
    iconUrl: "/sl.svg",
    name: "LKR",
    value: "304.39",
  },
  {
    iconUrl: "/aud.png",
    name: "AUD",
    value: "1.48",
  },
  {
    iconUrl: "/indea.webp",
    name: "INR",
    value: "83.49",
  },
];

const CountryList: React.FC = () => {
  return (
    <div className="flex justify-center w-full h-full p-6">
      <div className="flex flex-wrap justify-center gap-4">
        {countries.map((country, index) => (
          <div key={index} className="w-1/2 sm:w-1/3 p-2">
            <Card className="max-w-[400px] mx-auto">
              <CardHeader className="flex gap-3">
                <Image
                  alt={`${country.name} flag`}
                  height={40}
                  radius="sm"
                  src={`${country.iconUrl}`}
                  width={40}
                />
                <div className="flex flex-col">
                  <p className="text-md">{country.name}</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <p className="">1 USD = {country.value}</p>
              </CardBody>
              <Divider />
              <CardFooter>
                <Link
                  isExternal
                  showAnchorIcon
                  href="https://www.exchangerate-api.com/docs/free"
                >
                  Visit ExchangeRate API
                </Link>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryList;
