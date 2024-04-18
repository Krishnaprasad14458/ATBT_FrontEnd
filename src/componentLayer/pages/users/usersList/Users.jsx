
import React from 'react'
import { useNavigation } from 'react-router-dom';

const Users = () => {
  const navigation = useNavigation();

  const text =
    navigation.state === "submitting"
      ? "Saving..."
      : navigation.state === "loading"
      ? "Saved!"
      : "Go";
  return (
    <button type="submit">{text}</button>
  )
}

export default Users