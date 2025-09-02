'use client'

import ReservationForm from "@/src/app/(Customer)/reservation/_components/ReservationForm";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";

export default function ReservationModal() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button
                className="bg-red-600 text-white px-5 py-2.5 rounded-full font-semibold shadow-md border border-red-600 tracking-wide" onPress={onOpen}>
                Prenota un Appuntamentoo
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody >
                                <ReservationForm open={onOpenChange} />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
