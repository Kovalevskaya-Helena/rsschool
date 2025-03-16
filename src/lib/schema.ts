import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required('Name is a required field!').matches(/^[А-ЯA-Z]/, 'The first letter must be capitalized!'),
  age: yup.number().typeError('Age should be a number').required('Age is a required field!').positive('Age should be positive').integer(),
  email: yup.string().required('Email is a required field!').email('Email should have correct format'),
  password: yup.string()
    .matches(/\d/, 'Password should contain 1 number')
    .matches(/[A-Z]/, 'Password should contain 1 uppercased letter')
    .matches(/[a-z]/, 'Password should contain 1 lowercased letter')
    .matches(/\W/, 'Password should contain 1 special character')
    .required("Password is required!"),
  cpassword: yup.string().required("Confirm Password is required!").oneOf([yup.ref("password")], "Passwords do not match"),
  gender: yup.string().required('Gender ias a required field!'),
  image: yup.mixed<FileList>()
    .required()
    .test({
      message: 'Choose your avatar!',
      test: (fileList) => fileList && fileList.length > 0,
    })
    .test({
      message: 'Extension should be png or jpeg',
      test: ([ file ]) => {
        if (!file) return false;

        const [ , type ] = file.type.split('/');
        const isValid = ['jpeg', 'png'].includes(type);
        return isValid;
      }
    })
    .test({
      message: 'File should be less than 1 mb',
      test: ([file]) => {
        if (!file) return false;

        const maxSizeInBytes = 1 * 1e+6;

        const inValid = file.size <= maxSizeInBytes;
        return inValid;
      }
    }),
    country: yup.string().required('Country is a requared field!'),
    terms: yup.boolean()
    .oneOf([true], 'You must accept to the terms')
    .required('Terms is a requared field!'),
})

export type FormSchema = yup.InferType<typeof schema>;
