# TanStack Query Migration

## Purpose

This document captures the completed migration from custom useFetch to TanStack Query.

---

## Migration Summary

### Completed Changes

1. **Package Installation**
   - Added `@tanstack/react-query` to dependencies

2. **Query Client Setup**
   - Configured `QueryClient` with 5-minute stale time
   - Wrapped app with `QueryClientProvider` in `main.jsx`
   - Added ErrorBoundary integration

3. **Query Keys Architecture**
   - Created `src/api/queryKeys.js` with hierarchical key structure
   - Supports list, detail, and parameterized queries for all resources

4. **API Layer Transformation**
   - All endpoint files now export both:
     - Original API functions (for direct calls)
     - TanStack Query hooks (for components)
   - Automatic cache invalidation on mutations
   - Proper loading states and error handling

5. **Hook Naming Convention**
   ```js
   usePagesList()      // GET /api/pages/
   usePage(id)         // GET /api/pages/{id}/
   useCreatePage()     // POST /api/pages/
   useUpdatePage()     // PUT /api/pages/{id}/
   usePatchPage()      // PATCH /api/pages/{id}/
   useDeletePage()     // DELETE /api/pages/{id}/
   ```

6. **Cleanup**
   - Removed `src/hooks/useFetch.js`
   - No longer needed with TanStack Query

---

## Usage Examples

### Before (useFetch)
```js
const { data, loading, error } = useFetch(() => pagesApi.getAll());
```

### After (TanStack Query)
```js
const { data, isLoading, error } = usePagesList();
```

### Mutation Example
```js
const createPage = useCreatePage();
// createPage.mutate(data) automatically invalidates cache
```

---

## Benefits Achieved

1. **Automatic Caching** - 5-minute stale time with background refetching
2. **Reduced Boilerplate** - No manual loading state management
3. **Better Error Handling** - Built-in retry logic and error boundaries
4. **DevTools Support** - Query inspection available via browser extension
5. **Optimistic Updates** - Ready for future implementation
6. **Predictable Cache Invalidation** - Automatic on mutations

---

## Configuration Details

### Query Client Defaults
```js
{
  staleTime: 5 * 60 * 1000, // 5 minutes
  retry: 1,
}
```

### Cache Invalidation Strategy
- List queries invalidated on any mutation
- Detail queries invalidated on related item mutations
- Ensures UI stays consistent with backend state

---

## Next Steps

All components can now use the new hooks:
- Pages feature: `usePagesList()`, `usePage()`
- News feature: `useNewsList()`, `useNewsPost()`
- Classes feature: `useClassList()`, `useClass()`
- Contact, Social Links, Media Items: similar hooks available

Migration is complete and ready for feature implementation.