import React, { useRef } from 'react';


export default function Modal({children, open, modalSetterClickHandler}) {

    const modalContainer = useRef()

    const modalOverlayClickHandler = (e) => {
        if(e.target !== modalContainer.current) {
            modalSetterClickHandler(state => false);
        }
    }
    

    return (
        <>
        {open && 
            <div open={open} className={`cc-modal-container`} onClick={modalOverlayClickHandler}>
                <div
                    className="cc-modal"
                    ref={modalContainer}
                >

                {children}

                </div>
            </div>
        }
        </>
    );
}