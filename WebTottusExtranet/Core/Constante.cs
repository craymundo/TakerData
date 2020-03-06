namespace WebTakerData.Core
{
    public static class Constante
    {
        public static class Session
        {
            public const string UsuarioActual = "UsuarioActual";
            public const string CodigoUsuario = "CodigoUsuario";
            public const string TokenConeccion = "TokenConeccion";
            public const string Menu = "Menu";
            public const string Proceso = "Proceso";
        }

        public static class LoginResultado
        {
            public const int UsuarioInValido = 0;
            public const int UsuarioValido = 1;
        }

          public static class Api
        {
            public static class Login
            {
                public const string AutentificacionUsuario = "http://localhost:89/ApiPostCupos/public/api/UsuarioAutentificacion/Autentificacion";

                public const string OnLoadBaseDatos = "/api/Local/UpdateLocal";
                public const string SendBaseDatos = "/api/Local/SaveStorageGcpAsync";

            }



        }

    }
}
