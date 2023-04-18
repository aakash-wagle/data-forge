import React from 'react'

const Google = () => {
  return (
    <button
        style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "8px 16px",
        borderRadius: "5px",
        margin: "auto",
        backgroundColor: "black",
        color: "white",
        border: "none",
        boxShadow: "none",
        width: "250px",
        height: "50px",
        }}
    >
        <img
        src="https://img.icons8.com/color/48/000000/google-logo.png"
        alt="google"
        style={{ marginRight: "10px", width: "24px", height: "24px" }}
        />
        <span style={{ fontSize: "14px" }}>Sign in with Google</span>
    </button>
  )
}

export default Google