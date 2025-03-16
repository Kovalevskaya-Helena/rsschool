import { useState, useEffect, FunctionComponent, PropsWithChildren } from 'react'
import { Link } from "react-router"
import styles from './main.module.css'
import { useDispatch, useSelector } from "react-redux"
import { getFormDataCommited, getFormDataDraft, updateCommited } from "../../store/formSlice";
import { FormData } from '../Form/Form';

const clsx = (...classNames: (string | false)[]) => classNames.filter(className => Boolean(className)).join(' ');

const TextWrapper: FunctionComponent<PropsWithChildren<{ isHighlighted: boolean }>> = ({ children, isHighlighted }) =>
  <div className={clsx(styles.field, isHighlighted && styles.highlighted)}>{children}</div>;

export const Main = () => {
  const dispatch = useDispatch()

  const [changedField, setChangedField] = useState<Set<string>>(new Set());

  const formDataDraft = useSelector(getFormDataDraft);
  const formDataCommited = useSelector(getFormDataCommited);

  useEffect(() => {
    const commitedKeys = Object.keys(formDataCommited) as (keyof FormData)[];
    const changedKeys = commitedKeys.filter(key => formDataCommited[key] !== formDataDraft[key]);

    setChangedField(new Set(changedKeys));
    dispatch(updateCommited());
  }, [dispatch])

  const { name, age, email, image, gender, password, cpassword, country, terms } = formDataCommited;


  return <div className={styles.container}>
    <div className={styles.card}>
      <img src={image} alt="Avatar" className={clsx(styles.avatar, changedField.has('image') && styles.highlighted)} />

      <h2 className={clsx(styles.title, changedField.has('name') && styles.highlighted)}>{name}</h2>

      <div className={styles.content}>
        <TextWrapper isHighlighted={changedField.has('age')}>
          <span className={styles.label}>Age:</span> {age}
        </TextWrapper>
        <TextWrapper isHighlighted={changedField.has('email')}>
          <span className={styles.label}>Email:</span> {email}
        </TextWrapper>
        <TextWrapper isHighlighted={changedField.has('password')}>
          <span className={styles.label}>Password:</span> {password}
        </TextWrapper>
        <TextWrapper isHighlighted={changedField.has('cpassword')}>
          <span className={styles.label}>Confirm password:</span> {cpassword}
        </TextWrapper>
        <TextWrapper isHighlighted={changedField.has('country')}>
          <span className={styles.label}>Country:</span> {country}
        </TextWrapper>
        <TextWrapper isHighlighted={changedField.has('gender')}>
          <span className={styles.label}>Gender:</span> {gender}
        </TextWrapper>
        <div className={clsx(styles.terms, changedField.has('terms') && styles.highlighted)}>
          <span className={styles.label}>Conditions acctepted:</span> {terms ? "Yes" : "No"}
        </div>
      </div>
    </div>
    <div className={styles.buttonGroup}>
      <Link to='/uncontrolledform' className={styles.button}> Go to uncontrolled form </Link>
      <Link to='/controlledform' className={styles.button}> Go to controlled form </Link>
    </div>
  </div>
}
