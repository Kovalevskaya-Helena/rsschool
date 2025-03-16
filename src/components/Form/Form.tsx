import styles from './form.module.css'
import { FormEvent, FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { getCountries } from "../../store/formSlice";
import { PasswordStrength } from './PasswordStrength';

export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  cpassword: string;
  gender: string;
  image: string;
  country: string;
  terms: boolean;
}

export type Errors = Record<keyof FormData, { message?: string }>;

interface FormProps {
  errors?: Partial<Errors>;
  register?: (key: keyof FormData) => { name: string };
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  passwordStrength?: [number, number]
}

export const Form: FunctionComponent<FormProps> = ({
  errors = {},
  onSubmit,
  register = (key: string) => ({ name: key }),
  passwordStrength
}) => {
  const countries = useSelector(getCountries);

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <h2 className={styles.formTitle}>Registration</h2>
      <div className={styles.inputGroup}>
        <label htmlFor="name" className={styles.label}>Name:</label>
        <input {...register('name')} type="text" id="name" className={styles.input} />
        <div className={styles.errorContainer}>
          {errors.name &&
            <div className={`${styles.errorMessage} ${errors.name ? styles.show : ""}`}>
              {errors.name.message}
            </div>}
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="age" className={styles.label}>Age:</label>
        <input {...register('age')} type="text" id="age" className={styles.input} />
        <div className={styles.errorContainer}>
          {errors.age &&
            <div className={`${styles.errorMessage} ${errors.age ? styles.show : ""}`}>
              {errors.age.message}
            </div>}
        </div>
      </div>

      <div className={styles.radioGroup}>
        <label htmlFor="male" className={styles.radioLabel}>
          <input {...register("gender")} type="radio" value='male' id="male" />
          Male</label>
        <input {...register("gender")} type="radio" value="female" id="female" />
        <label htmlFor="male" className={styles.radioLabel}>
          Female</label>
        <div className={styles.errorContainer}>
          {errors.gender &&
            <div className={`${styles.errorMessage} ${errors.gender ? styles.show : ""}`}>
              {errors.gender.message}
            </div>}
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="country" className={styles.label}>Choose your country:</label>
        <input {...register('country')} list="userCountries" type="text" id="country" className={styles.input} />
        <datalist id="userCountries" className={styles.input}>
          {countries.map((country, idx) => <option key={idx} value={country} />)}
        </datalist>
        <div className={styles.errorContainer}>
          {errors.country &&
            <div className={`${styles.errorMessage} ${errors.country ? styles.show : ""}`}>
              {errors.country.message}
            </div>}
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="email" className={styles.label}>Email:</label>
        <input {...register('email')} type="email" id="email" className={styles.input} />
        <div className={styles.errorContainer}>
          {errors.email &&
            <div className={`${styles.errorMessage} ${errors.email ? styles.show : ""}`}>
              {errors.email.message}
            </div>}
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="password" className={styles.label}>Password:</label>
        <input {...register('password')} type="password" id="password" className={styles.input} />
        <div className={styles.errorContainer}>
          {errors.password &&
            <div className={`${styles.errorMessage} ${errors.password ? styles.show : ""}`}>
              {passwordStrength && <PasswordStrength strength={passwordStrength} />}
              {errors.password?.message}
            </div>}
        </div>

      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="cpassword" className={styles.label}>Confirm password:</label>
        <input {...register('cpassword')} type="password" id="cpassword" className={styles.input} />
        <div className={styles.errorContainer}>
          {errors.cpassword &&
            <div className={`${styles.errorMessage} ${errors.cpassword ? styles.show : ""}`}>
              {errors.cpassword.message}
            </div>}
        </div>
      </div>

      <div className={styles.fileInput}>
        <label htmlFor="image" className={styles.fileInputLabel}>Choose your image:</label>
        <input {...register('image')} type="file" id="image" className={styles.input} />
        <div className={styles.errorContainer}>
          {errors.image &&
            <div className={`${styles.errorMessage} ${errors.image ? styles.show : ""}`}>
              {errors.image.message}
            </div>}
        </div>
      </div>
      <div className={styles.checkboxGroup}>
        <input {...register('terms')} type="checkbox" id="terms" />
        <label htmlFor="terms" className={styles.checkboxLabel}>accept Terms and Conditions agreement </label>
      </div>
      <div className={styles.errorContainer}>
        {errors.terms &&
          <div className={`${styles.errorMessage} ${errors.terms ? styles.show : ""}`}>
            {errors.terms.message}
          </div>}
      </div>

      <button type="submit" disabled={Object.keys(errors).length > 0} className={styles.submitButton}>Submit</button>
    </form >
  )
}
