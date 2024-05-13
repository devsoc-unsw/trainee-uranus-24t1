import BackIcon from '../../images/backIcon.png'

const BackButton = () => {
  return (
    <button style={{ width: '45px', height: '45px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
    className={"rounded-full bg-secondary-bg-500"}>
    <img src={BackIcon} alt="Back" style={{ width: '60%', height: '35%', filter: 'invert(100%)'}} className="fill-white"/> 
    </button>
  )
}

export default BackButton