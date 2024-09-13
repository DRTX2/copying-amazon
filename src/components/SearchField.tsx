import { forwardRef } from "react";

const SearchFieldStyles = {
  width: '100%',
  padding: '5%',
  minHeight:"100vh",
  backgroundImage: `
    linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url('/copying-amazon/assets/img/searchBackground.jpg')
  `,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  display:'flex',
  alignItems:'center',
  justifyContent:'center'
};

const searchBarStyles={
    width:'100%',
    maxWidth:'43.75rem',
    background:'rgba(255,255,255,0.2)',
    display:'flex',
    alignItems:'center',
    borderRadius:'1.4rem',
    padding:'0.8rem 1.6rem',
    backdropFilter: 'blur(0.25em) saturate(180%)',
};

const inputStyles={
    background:'transparent',
    flex:1,
    border:0,
    outline:'none',
    padding:'24px 20px',
    fontSize:'20px',
    color:'#cac7ff',
    '::placeholder': {
        color: 'transparent', // Hacer el texto del placeholder transparente
    }
};

const SearchField = forwardRef<HTMLInputElement, {}>((props, ref) => {
  return (
    <div className="container" style={SearchFieldStyles}>
      <form style={searchBarStyles}>
        <input
          ref={ref}
          type="text"
          placeholder="search anything"
          name="search"
          style={inputStyles}
        />
        <button
          type="submit"
          onClick={event => event.preventDefault()}
          className="searchBtn"
        >
          <i className="fas fa-search"></i>
        </button>
      </form>
    </div>
  );
});

export default SearchField;
