export default function ({ redirect, route }) {
    if (process.client) {
      const token = localStorage.getItem('token');

      const publicPages = ['/login', '/register'];
  
      if (!token && !publicPages.includes(route.path)) {
        return redirect('/login');
      }
    }
  }
  