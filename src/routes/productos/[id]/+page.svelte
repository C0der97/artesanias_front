<!-- src/routes/productos/[id]/+page.svelte -->
<script lang="ts">
  import { productos, artesanos } from '$lib/data';
  import { page } from '$app/stores';
  
  $: producto = productos.find(p => p.id === $page.params.id);
  $: artesano = producto ? artesanos.find(a => a.id === producto.artesanoId) : null;
</script>

<svelte:head>
  <title>{producto?.nombre ?? 'Producto'} - Artesanías Tradicionales</title>
</svelte:head>

{#if producto && artesano}
  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <img 
          src={producto.imagenUrl} 
          alt={producto.nombre}
          class="w-full rounded-lg shadow-lg"
        />
      </div>
      
      <div>
        <h1 class="text-3xl font-bold mb-4">{producto.nombre}</h1>
        <p class="text-gray-600 mb-4">{producto.descripcion}</p>
        
        <div class="mb-4">
          <h2 class="text-xl font-semibold mb-2">Materiales:</h2>
          <div class="flex flex-wrap gap-2">
            {#each producto.materiales as material}
              <span class="bg-gray-100 px-3 py-1 rounded-full">
                {material}
              </span>
            {/each}
          </div>
        </div>
        
        <div class="mb-4">
          <h2 class="text-xl font-semibold mb-2">Artesano:</h2>
          <div class="bg-gray-50 p-4 rounded-lg">
            <h3 class="font-semibold">{artesano.nombre}</h3>
            <p class="text-sm text-gray-600">{artesano.especialidad}</p>
            <p class="text-sm mt-2">{artesano.historia}</p>
          </div>
        </div>
        
        <div class="mt-8">
          <span class="text-2xl font-bold">
            ${producto.precio.toLocaleString()}
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