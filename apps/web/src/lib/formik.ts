import { useFormik } from "formik";
import * as Yup from "yup";

export default function useCustomFormik({
  onSubmit,
  maxLength,
  defaultDesc,
}: UseCustomFormikProps) {
  const formik = useFormik({
    validationSchema: Yup.object({
      desc: Yup.string()
        .max(maxLength, `Must be ${maxLength} characters or less`)
        .required("Required"),
    }),

    initialValues: {
      desc: defaultDesc || "",
    },
    enableReinitialize: true,
    onSubmit,
  });

  return formik;
}

type UseCustomFormikProps = {
  onSubmit: (values: any) => void;
  maxLength: number;
  defaultDesc?: string;
};
