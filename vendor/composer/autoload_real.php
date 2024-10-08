<?php

// autoload_real.php @generated by Composer

class ComposerAutoloaderInit576b11f7b42e86fabae2c7fc1596b647
{
    private static $loader;

    public static function loadClassLoader($class)
    {
        if ('Composer\Autoload\ClassLoader' === $class) {
            require __DIR__ . '/ClassLoader.php';
        }
    }

    /**
     * @return \Composer\Autoload\ClassLoader
     */
    public static function getLoader()
    {
        if (null !== self::$loader) {
            return self::$loader;
        }

        spl_autoload_register(array('ComposerAutoloaderInit576b11f7b42e86fabae2c7fc1596b647', 'loadClassLoader'), true, true);
        self::$loader = $loader = new \Composer\Autoload\ClassLoader(\dirname(__DIR__));
        spl_autoload_unregister(array('ComposerAutoloaderInit576b11f7b42e86fabae2c7fc1596b647', 'loadClassLoader'));

        require __DIR__ . '/autoload_static.php';
        call_user_func(\Composer\Autoload\ComposerStaticInit576b11f7b42e86fabae2c7fc1596b647::getInitializer($loader));

        $loader->register(true);

        return $loader;
    }
}
