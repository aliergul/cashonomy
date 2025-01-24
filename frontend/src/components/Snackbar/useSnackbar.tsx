import { useDispatch } from "react-redux";
import { addSnackbar } from "./SnackbarSlice";

type Options = {
  duration: number;
};

const useSnackbar = () => {
  const dispatch = useDispatch();
  const add = (text: string, params?: Options) => {
    const { duration } = params || { duration: 6000 };

    dispatch(addSnackbar({ text, duration }));
  };
  return add;
};

export default useSnackbar;
