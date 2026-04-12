type Props = {
  onConfirm: () => void;
  onCancel: () => void;
};

function DeleteModal({ onConfirm, onCancel }: Props) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "24px",
          borderRadius: "16px",
          width: "90%",
          maxWidth: "420px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        }}
      >
        <h5 className="fw-bold mb-3">Delete opportunity?</h5>
        <p className="mb-4">
          Are you sure you want to delete this opportunity?
        </p>

        <div className="d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="button"
            className="btn btn-danger"
            onClick={onConfirm}
          >
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;