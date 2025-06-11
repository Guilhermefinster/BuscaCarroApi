import './CarDetailsModal.css';

function CarDetailsModal({ carro, onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{carro.brand_name} {carro.model_name}</h2>
        <img src={carro.images[0]} alt={carro.model_name} />
        <p><strong>Preço:</strong> R$ {carro.price}</p>
        <p><strong>Combustível:</strong> {carro.fuel_name}</p>
        <p><strong>Transmissão:</strong> {carro.transmission_name}</p>
        <p><strong>Carroceria:</strong> {carro.bodywork}</p>
        <h4>Conforto</h4>
        <ul>
          {Object.entries(carro.comfort).map(([item, val]) => val && <li key={item}>{item}</li>)}
        </ul>
        <h4>Entretenimento</h4>
        <ul>
          {Object.entries(carro.entertainment).map(([item, val]) => val && <li key={item}>{item}</li>)}
        </ul>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

export default CarDetailsModal;
