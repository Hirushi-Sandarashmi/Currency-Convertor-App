"use client";
import React, { ReactNode, useRef } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { color } from "framer-motion";
import { CircularProgress } from "@nextui-org/react";
import { useSession } from "next-auth/react";

export default function Records() {
  const session = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["transferData"],
    queryFn: async () =>
      await fetch(
        `http://127.0.0.1:3001/api/transactions/find/${session.data?.id}`,
        {
          method: "GET",
        }
      ).then((res) => res.json()),
    enabled: !!session.data?.id,
  });

  const deleteData = useMutation({
    mutationFn: async (id: string) =>
      await fetch(`http://127.0.0.1:3001/api/transactions/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transferData"] });
      toast.success("Record deleted successful!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
    },
  });

  return (
    <>
      <ToastContainer />
      {error ? (
        <div className="w-[1200px] h-[600px] flex flex-col justify-center items-center">
          Error: API not responding!
        </div>
      ) : isLoading ? (
        <div className="w-[1200px] h-[600px] flex flex-col justify-center items-center">
          <CircularProgress size="lg" aria-label="Loading..." />
        </div>
      ) : (
        <div className="rounded-lg w-[1200px] h-[600px] ml-16 -mr-12 p-4 ">
          <Table aria-label="Transactions table">
            <TableHeader>
              <TableColumn>AMOUNT</TableColumn>
              <TableColumn>CURRENCY</TableColumn>
              <TableColumn>DATE & TIME</TableColumn>
              <TableColumn>ACTION</TableColumn>
            </TableHeader>
            <TableBody
              isLoading={isLoading}
              emptyContent={<div>No Record Found</div>}
            >
              {data?.map(
                (item: {
                  [x: string]: any;
                  id: string;
                  amount: number;
                  currency: string;
                }) => (
                  <TableRow key="">
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>{item.currency}</TableCell>
                    <TableCell>{item.createdAt}</TableCell>
                    <TableCell>
                      <Button
                        isIconOnly
                        color="danger"
                        variant="faded"
                        aria-label="Take a photo"
                        onPress={onOpen}
                      >
                        <MdDelete />
                      </Button>
                      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                        <ModalContent>
                          {(onClose) => (
                            <>
                              <ModalHeader className="flex flex-col gap-1">
                                Delete Confirmation
                              </ModalHeader>
                              <ModalBody>
                                <p>Do you want to delete this record?</p>
                              </ModalBody>
                              <ModalFooter>
                                <Button
                                  color="danger"
                                  variant="light"
                                  onPress={onClose}
                                >
                                  Close
                                </Button>
                                <Button
                                  color="primary"
                                  onPress={onClose}
                                  onClick={() => {
                                    deleteData.mutate(item._id as string);
                                  }}
                                >
                                  Detele
                                </Button>
                              </ModalFooter>
                            </>
                          )}
                        </ModalContent>
                      </Modal>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
          <Button
            color="default"
            variant="bordered"
            className="p-6 text-lg mt-4 mb-4 w-[1150px] ml-2"
            as={Link}
            href="/"
          >
            Back
          </Button>
        </div>
      )}
    </>
  );
}
