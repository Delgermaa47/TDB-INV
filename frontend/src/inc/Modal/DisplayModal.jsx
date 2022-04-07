import React, { useState, useEffect } from 'react';

import Modal from './Modal'

function DisplayModal(props) {

    /*
        const modal = {
            modal_status: "open",
            modal_icon: modal_icon,
            modal_bg: modal_bg,
            custom_width: {modal_info.custom_width},
            icon_color: icon_color,
            title: title,
            text: text,
            has_button: has_button,
            actionNameBack: actionNameBack,
            actionNameDelete: actionNameDelete,
            modalAction: modalAction,
            modalClose: modalClose
        }
    */

    const [modal_info, setModalInfo] = useState({})
    const [modal_status, setModalStatus] = useState('closed')

    useEffect(() => {
        props.getModalFunc(setModal)
    }, [props.getModalFunc])

    const handleModalOpen = (modal_status) => {
        if (modal_status == 'open') {
            setModalStatus('initial')
            setTimeout(() => {
                setModalStatus(modal_status)
            }, 150);
        }
        else {
            setModalStatus(modal_status)
        }
    }

    const setModal = (modal_info) => {
        handleModalOpen(modal_info.modal_status)
        setModalInfo(modal_info)
    }

    return (
        <Modal
            modal_status={modal_status}
            modal_icon={modal_info.modal_icon}
            modal_bg={modal_info.modal_bg}
            custom_width={modal_info.custom_width}
            icon_color={modal_info.icon_color}
            text={modal_info.text}
            title={modal_info.title}
            has_button={modal_info.has_button}
            actionNameBack={modal_info.actionNameBack}
            actionNameDelete={modal_info.actionNameDelete}
            modalAction={modal_info.modalAction}
            modalClose={modal_info.modalClose}
        />
    )
}

export default DisplayModal;
