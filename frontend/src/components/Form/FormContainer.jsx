// import React from "react";
// import { useForm, FormProvider } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";

// const FormContainer = ({
//   defaultValues,
//   onSubmit,
//   validationSchema,
//   children,
// }) => {
//   const methods = useForm({
//     defaultValues,
//     resolver: yupResolver(validationSchema),
//   });

//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={methods.handleSubmit((data) => onSubmit(data, methods))}>
//         {React.Children.map(children, (child) => {
//           return React.isValidElement(child)
//             ? React.cloneElement(child, { control: methods.control })
//             : child;
//         })}
//       </form>
//     </FormProvider>
//   );
// };

// export default FormContainer;
import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const FormContainer = ({
  defaultValues,
  onSubmit,
  validationSchema,
  children,
  resetOnClose = false,
}) => {
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (resetOnClose) {
      methods.reset(defaultValues);
    }
  }, [resetOnClose, methods, defaultValues]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => onSubmit(data, methods))}>
        {React.Children.map(children, (child) => {
          return React.isValidElement(child)
            ? React.cloneElement(child, { control: methods.control })
            : child;
        })}
      </form>
    </FormProvider>
  );
};

export default FormContainer;
