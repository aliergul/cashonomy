import React, { useCallback } from "react";
import { useAppSelector } from "../../store";
import { useDispatch } from "react-redux";
import { removeSnackbar } from "./SnackbarSlice";
import { useTransition, animated } from "react-spring";
import SnackbarItem from "./SnackbarItem";

const SnackbarContainer: React.FC = () => {
  const items = useAppSelector((state) => state.snackbars.items);
  const dispatch = useDispatch();

  const handleClose = useCallback(
    (id: string) => {
      dispatch(removeSnackbar(id));
    },
    [dispatch]
  );

  const transitions = useTransition(items, {
    from: { opacity: 0, transform: "scale(0.9)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.9)" },
    delay: 200,
  });

  return (
    <div
      className="fixed bottom-2 z-1000 right-2 min:w-48"
      style={{ zIndex: 9999 }}
    >
      {transitions(({ opacity, transform }, item) => {
        return (
          <animated.div
            style={{
              opacity,
              transform,
            }}
          >
            <SnackbarItem options={item} key={item.id} onClose={handleClose} />
          </animated.div>
        );
      })}
    </div>
  );
};

export default SnackbarContainer;
