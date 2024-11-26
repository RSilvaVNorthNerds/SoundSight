function Navigation() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "center",
        borderBottom: "1px solid #ccc",
        width: "80%",
        height: "75px",
        position: "fixed",
        top: 0,
        zIndex: 10,
        backgroundColor: "#181818",
        borderRadius: "0 0 10px 10px",
        left: 0,
        right: 0,
        margin: "0 auto",
      }}
    >
      <img src="audio.png" alt="SoundSightLogo" />
      <h1>SoundSight</h1>
    </nav>
  );
}

export default Navigation;
