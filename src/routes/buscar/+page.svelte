<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let busqueda = $page.url.searchParams.get('q') || '';
  let categoriaSeleccionada = $page.url.searchParams.get('categoria') || '';
  let regionSeleccionada = $page.url.searchParams.get('region') || '';
  let productos = [];  // Aquí guardaremos los productos
  let productosFiltrados = [];  // Aquí se almacenarán los productos después de aplicar filtros
  let timeoutId: NodeJS.Timeout;

  const categorias = ['Tejidos', 'Cerámica'];
  const regiones = ['Boyacá', 'Cundinamarca'];

  // Función para cargar los productos desde la API
  const cargarProductos = async () => {
    try {
      const response = await fetch('http://107.20.173.246/api/productos');
      if (!response.ok) throw new Error('No se pudieron cargar los productos');
      productos = await response.json();
      filtrarProductos();  // Filtrar los productos después de cargarlos
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  };

  // Función para aplicar los filtros
  const filtrarProductos = () => {
    productosFiltrados = productos.filter(producto => {
      const coincideBusqueda = !busqueda || 
        producto.name.toLowerCase().includes(busqueda.toLowerCase()) ||
        producto.description.toLowerCase().includes(busqueda.toLowerCase());
      
      const coincideCategoria = !categoriaSeleccionada || 
        producto.categoria === categoriaSeleccionada;
      
      const coincideRegion = !regionSeleccionada || 
        producto.region === regionSeleccionada;

      return coincideBusqueda && coincideCategoria && coincideRegion;
    });
  };

  // Actualizar los filtros en la URL
  function actualizarFiltros() {
    const params = new URLSearchParams();
    if (busqueda) params.set('q', busqueda);
    if (categoriaSeleccionada) params.set('categoria', categoriaSeleccionada);
    if (regionSeleccionada) params.set('region', regionSeleccionada);
    goto(`/buscar?${params.toString()}`);
    filtrarProductos();  // Aplicar los filtros después de actualizar la URL
  }

  // Manejar la búsqueda con un retraso (debounce)
  function handleSearch(event: Event) {
    // Limpiar el timeout anterior si existe
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    // Crear un nuevo timeout
    timeoutId = setTimeout(() => {
      actualizarFiltros();
    }, 1000); // Espera 1 segundo antes de ejecutar la búsqueda
  }

  // Cargar productos cuando el componente se monta
  onMount(() => {
    cargarProductos();
    
    // Limpiar el timeout cuando el componente se desmonta
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  });
</script>

<svelte:head>
  <title>Buscar Productos - Artesanías Tradicionales</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <div class="mb-8">
    <input
      type="text"
      placeholder="Buscar productos..."
      class="w-full p-2 border rounded"
      bind:value={busqueda}
      on:input={handleSearch}
    />
    
    <div class="flex gap-4 mt-4">
      <select
        class="p-2 border rounded"
        bind:value={categoriaSeleccionada}
        on:change={actualizarFiltros}
      >
        <option value="">Todas las categorías</option>
        {#each categorias as categoria}
          <option value={categoria}>{categoria}</option>
        {/each}
      </select>
      
      <select
        class="p-2 border rounded"
        bind:value={regionSeleccionada}
        on:change={actualizarFiltros}
      >
        <option value="">Todas las regiones</option>
        {#each regiones as region}
          <option value={region}>{region}</option>
        {/each}
      </select>
    </div>
  </div>
  
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each productosFiltrados as producto}
      <a 
        href={`/productos/${producto.id}`}
        class="bg-white rounded-lg overflow-hidden shadow-lg group"
      >
        <img 
          src={producto.image_url} 
          alt={producto.name}
          class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div class="p-4">
          <h2 class="text-xl font-semibold">{producto.name}</h2>
          <p class="text-gray-600">{producto.description}</p>
          <div class="mt-2">
            <span class="text-lg font-bold">
              ${producto.price.toLocaleString()}
            </span>
          </div>
          <div class="mt-2 flex gap-2">
            <span class="inline-block bg-blue-100 text-blue-800 rounded px-2 py-1 text-sm">
              {producto.region}
            </span>
            <span class="inline-block bg-green-100 text-green-800 rounded px-2 py-1 text-sm">
              {producto.categoria}
            </span>
          </div>
        </div>
      </a>
    {/each}
  </div>
</div>
