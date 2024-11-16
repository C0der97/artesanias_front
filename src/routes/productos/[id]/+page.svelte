<script lang="ts">
  import { page } from '$app/stores';

  let producto: { artesan_id: any; name: any; image_url: any; description: any; materials: any; price: { toLocaleString: () => void; }; } | null = null;
  let artesano: { name: any; specialty: any; history: any; } | null = null;

  // Recuperamos el id del producto desde los parámetros de la URL
  const productoId = $page.params.id;

  // Función para cargar los productos y luego buscar el producto específico por id
  const loadProduct = async () => {
    try {
      // Asegúrate de que la URL sea correcta
      const productResponse = await fetch('https://0d25f9c0yb.execute-api.us-east-1.amazonaws.com/api/productos');
      if (!productResponse.ok) throw new Error('No se pudieron cargar los productos');
      
      const productos = await productResponse.json();

      // Buscar el producto por id
      producto = productos.find((p: { id: number; }) => p.id === parseInt(productoId)); // Asegúrate de que el id sea numérico

      // Si el producto es encontrado, buscar el artesano
      if (producto?.artesan_id) {
        const artesanoResponse = await fetch(`https://0d25f9c0yb.execute-api.us-east-1.amazonaws.com/api/artesanos/${producto.artesan_id}`);
        if (!artesanoResponse.ok) throw new Error('Artesano no encontrado');
        artesano = await artesanoResponse.json();
      }
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };

  // Cargar los datos cuando el componente se monta
  import { onMount } from 'svelte';
  onMount(() => {
    loadProduct();
  });
</script>

<svelte:head>
  <title>{producto?.name ?? 'Producto'} - Artesanías Tradicionales</title>
</svelte:head>

{#if producto}
  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <img 
          src={producto.image_url} 
          alt={producto.name}
          class="w-full rounded-lg shadow-lg"
        />
      </div>
      
      <div>
        <h1 class="text-3xl font-bold mb-4">{producto.name}</h1>
        <p class="text-gray-600 mb-4">{producto.description}</p>
        
        <div class="mb-4">
          <h2 class="text-xl font-semibold mb-2">Materiales:</h2>
          <div class="flex flex-wrap gap-2">
            {#each producto.materials as material}
              <span class="bg-gray-100 px-3 py-1 rounded-full">
                {material}
              </span>
            {/each}
          </div>
        </div>
        
        <div class="mb-4">
          <h2 class="text-xl font-semibold mb-2">Artesano:</h2>
          <div class="bg-gray-50 p-4 rounded-lg">
            <h3 class="font-semibold">{artesano?.name}</h3>
            <p class="text-sm text-gray-600">{artesano?.specialty}</p>
            <p class="text-sm mt-2">{artesano?.history}</p>
          </div>
        </div>
        
        <div class="mt-8">
          <span class="text-2xl font-bold">
            ${producto.price.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  </div>
{:else}
  <div class="container mx-auto px-4 py-8">
    <p>Producto no encontrado</p>
  </div>
{/if}
