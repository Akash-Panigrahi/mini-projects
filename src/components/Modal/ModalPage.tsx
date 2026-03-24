import { useModal } from "./ModalContext";

function ModalPage() {
  const { openModal } = useModal();

  return (
    <button
      onClick={() => {
        openModal({
          content: (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <span>Modal 1</span>
              <button>Dummy button</button>
              <button
                onClick={() => {
                  openModal({
                    content: (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                        }}
                      >
                        <span>Modal 2</span>
                        <button>Focusable Item 1</button>
                        <button>Focusable Item 2</button>
                        <button>Focusable Item 3</button>
                      </div>
                    ),
                  });
                }}
              >
                Open Nested Modal
              </button>
            </div>
          ),
        });
      }}
    >
      Open Modal
    </button>
  );
}

export default ModalPage;
