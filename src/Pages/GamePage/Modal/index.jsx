import React, { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const ModalDiv = ({ modalIsOpen, closeModal, step }) => {
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {step < 2 && (
          <div class="col text-center">
            <h2>Ok, tu as atteint l'étage {step} de la pyramide !</h2>

            <div>
              C'est vraiment ridicule, ton adversaire n'aura pas de mal à te
              vaincre... va te cacher !
            </div>
            <button class="btn btn-warning" onClick={closeModal}>
              Revenir à mon profil
            </button>
          </div>
        )}
        {step >= 2 && step <= 4 && (
          <div class="col text-center">
            <h2>Pas mal,tu as atteint l'étage {step} de la pyramide !</h2>
            <div>
              Résultat honorable, voyons si ton adversaire peut faire mieux !
            </div>
            <button class="btn btn-warning" onClick={closeModal}>
              Revenir à mon profil
            </button>
          </div>
        )}
        {step === 5 && (
          <div class="col text-center">
            <h2>Tu as atteint l'étage {step} de la pyramide !</h2>
            <div>
              Tu finis à une marche du sommet de la pyramide ! Belle
              performance, ton adversaire va devoir se surpasser !
            </div>
            <button class="btn btn-warning" onClick={closeModal}>
              Revenir à mon profil
            </button>
          </div>
        )}
        {step === 6 && (
          <div class="col text-center">
            <h2>Tu as atteint le sommet de la pyramide !!!</h2>
            <div>
              Bravo ! Le dieu-serpent est fier de toi ! Si ton adversaire ne
              fait pas preuve d'autant de force, tu gagneras cette bataille !
            </div>
            <button class="btn btn-warning" onClick={closeModal}>
              Revenir à mon profil
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ModalDiv;
