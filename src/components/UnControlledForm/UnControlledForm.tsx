import { schema } from "../../lib/schema";
import { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import { useDispatch } from "react-redux";
import { updateFormData } from "../../store/formSlice";
import { Form, type Errors } from "../Form/Form";
import { Schema, ValidationError, reach } from 'yup';
import { useNavigate } from "react-router";
import { getPasswordStrength } from "../helpers/getPasswordStrength";
import { getBase64Image } from "../../helpers/getBase64Image";


const asArray = <T,>(value: T | T[]) => Array.isArray(value) ? value : [value];
const isImageFile = ({ type }: { type: string }) => type.startsWith('image/');

export const UnControlledForm: FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<Errors>();
  const [passwordStrength, setPasswordStrength] = useState<[number, number] | undefined>(undefined);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());

    schema
      .validate({
        ...form,
        image: asArray(form.image).filter((file) => isImageFile(file as File)),
        terms: form.terms === 'on',
      }, { abortEarly: false })
      .then(async (form) => {
        const { image: images, ...restData } = form;
        dispatch(updateFormData({
          ...restData,
          image: await getBase64Image(images[0])
        }));
        navigate('/');
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          const errors = error.inner.reduce((acc, innerError) => {
            const path = innerError.path as keyof Errors;


            if (!(path in acc)) {
              acc[path] = { message: innerError.errors[0] };
            }

            return acc;
          }, {} as Errors);

          setErrors(errors);
        }
      });
  }

  const register = (key: keyof Errors) => ({
    name: key,
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      setErrors((prev) => {
        if (!prev) return prev;

        const next = { ...prev };
        delete next[key];

        return next
      });

      if (key === 'password') {
        let passwordError = '';

        try {
          (reach(schema, 'password') as Schema).validateSync(event.target.value);
        } catch (error) {
          if (error instanceof ValidationError) {
            passwordError = error.message;
          }
        }

        setPasswordStrength(getPasswordStrength(event.target.value));

        if (passwordError) {
          setErrors((prev) => {
            const kek = prev ?? {};

            return {
              ...kek,
              password: { message: passwordError }
            } as Errors
          })
        }
      }
    }
  });


  return <Form onSubmit={onSubmit} errors={errors} register={register} passwordStrength={passwordStrength} />;
}
