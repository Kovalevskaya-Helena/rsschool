import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema, type FormSchema } from "../../lib/schema";
import { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { updateFormData } from "../../store/formSlice";
import { Form } from "../Form/Form";
import { getPasswordStrength } from "../helpers/getPasswordStrength";
import { getBase64Image } from "../../helpers/getBase64Image";


export const ControlledForm: FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    mode: 'onChange', resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormSchema) => {
    const { image: images, ...restData } = data;

    dispatch(updateFormData({
      ...restData,
      image: await getBase64Image(images[0])
    }));
    navigate('/');
  }

  const password = watch('password');

  return <Form errors={errors} register={register} onSubmit={handleSubmit(onSubmit)} passwordStrength={getPasswordStrength(password)} />;
}
