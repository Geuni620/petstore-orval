import { useEffect, useState } from 'react';
import { getInventory, type getInventoryResponse } from 'src/api/store/store';

export const App = () => {
  const [inventory, setInventory] = useState<getInventoryResponse | null>(null);

  useEffect(() => {
    const fetchInventory = async () => {
      const response = await getInventory();
      setInventory(response);
    };

    fetchInventory();
  }, []);

  console.log(inventory);

  return (
    <div className="absolute left-10 top-0">
      <pre>{JSON.stringify(inventory, null, 2)}</pre>
    </div>
  );
};
