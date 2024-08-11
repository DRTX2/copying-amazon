

const LanguageCurrencies = () => {
  return (
    <div className="about-service">
            <div className="img-logo">
              <img
                src="/copying-amazon/assets/img/png-transparent-amazon-dark-hd-logo.png"
                alt="logo de amazon"
              />
            </div>
            <div className="configure-box-language">
              <select
                className="box-language"
                name="language"
                id="language-user"
              >
                <option value="ES">Español - ES</option>
                <option value="EN">English - EN</option>
                <option value="PT">Portugues - PT</option>
                <option value="CH">Chinese - CH</option>
              </select>
            </div>
            <div className="money">
              <button className="icon-configurate" id="money">
                lagooooooo
              </button>
            </div>
            <div className="nationality">
              <button className="icon-configurate" id="nationality">
                lagooooooo
              </button>
            </div>
          </div>
  )
}

export default LanguageCurrencies