-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema samuxybw_pedregal
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema samuxybw_pedregal
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `samuxybw_pedregal` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci ;
USE `samuxybw_pedregal` ;

-- -----------------------------------------------------
-- Table `samuxybw_pedregal`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `samuxybw_pedregal`.`roles` (
  `RolID` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(80) NOT NULL,
  `Descripcion` VARCHAR(150) NULL,
  PRIMARY KEY (`RolID`),
  UNIQUE INDEX `Nombre_UNIQUE` (`Nombre` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `samuxybw_pedregal`.`empleados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `samuxybw_pedregal`.`empleados` (
  `EmpleadoID` INT NOT NULL AUTO_INCREMENT,
  `RolID` INT NOT NULL,
  `Nombres` VARCHAR(150) NOT NULL,
  `Apellidos` VARCHAR(150) NOT NULL,
  `Salario` DECIMAL(10,2) NOT NULL,
  `Celular` VARCHAR(45) NULL,
  `Genero` VARCHAR(45) NOT NULL,
  `FechaNacimiento` DATE NULL,
  `FechaContratado` DATE NOT NULL,
  `FechaFinLabores` DATE NULL,
  `Imagen` VARCHAR(300) NULL DEFAULT 'usuario-default.png',
  `Usuario` VARCHAR(45) NOT NULL,
  `Clave` VARCHAR(300) NOT NULL,
  `VersionToken` INT NULL DEFAULT 1,
  `FechaCreacion` DATETIME NOT NULL,
  PRIMARY KEY (`EmpleadoID`),
  UNIQUE INDEX `Usuario_UNIQUE` (`Usuario` ASC) VISIBLE,
  INDEX `fkEmpleadosRolID_idx` (`RolID` ASC) VISIBLE,
  UNIQUE INDEX `Celular_UNIQUE` (`Celular` ASC) VISIBLE,
  CONSTRAINT `fkEmpleadosRolID`
    FOREIGN KEY (`RolID`)
    REFERENCES `samuxybw_pedregal`.`roles` (`RolID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `samuxybw_pedregal`.`compras`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `samuxybw_pedregal`.`compras` (
  `CompraID` INT NOT NULL AUTO_INCREMENT,
  `EmpleadoID` INT NOT NULL,
  `FechaHora` DATETIME NOT NULL,
  `Total` DECIMAL(10,2) NOT NULL,
  `Notas` VARCHAR(200) NULL,
  PRIMARY KEY (`CompraID`),
  INDEX `fkComprasEmpleadoID_idx` (`EmpleadoID` ASC) VISIBLE,
  CONSTRAINT `fkComprasEmpleadoID`
    FOREIGN KEY (`EmpleadoID`)
    REFERENCES `samuxybw_pedregal`.`empleados` (`EmpleadoID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `samuxybw_pedregal`.`clientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `samuxybw_pedregal`.`clientes` (
  `NIT` VARCHAR(80) NOT NULL,
  `Nombres` VARCHAR(80) NOT NULL,
  `Apellidos` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`NIT`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `samuxybw_pedregal`.`ventas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `samuxybw_pedregal`.`ventas` (
  `VentaID` INT NOT NULL AUTO_INCREMENT,
  `EmpleadoID` INT NOT NULL,
  `FechaHora` DATETIME NOT NULL,
  `NIT` VARCHAR(80) NULL,
  `Total` DECIMAL(10,2) NOT NULL,
  `MontoRecibido` DECIMAL(10,2) NOT NULL,
  `Vuelto` DECIMAL(10,2) NOT NULL,
  `Notas` VARCHAR(200) NULL,
  PRIMARY KEY (`VentaID`),
  INDEX `fkVentasEmpleadoID_idx` (`EmpleadoID` ASC) VISIBLE,
  INDEX `fkClientesNIT_idx` (`NIT` ASC) VISIBLE,
  CONSTRAINT `fkVentasEmpleadoID`
    FOREIGN KEY (`EmpleadoID`)
    REFERENCES `samuxybw_pedregal`.`empleados` (`EmpleadoID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fkClientesNIT`
    FOREIGN KEY (`NIT`)
    REFERENCES `samuxybw_pedregal`.`clientes` (`NIT`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `samuxybw_pedregal`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `samuxybw_pedregal`.`productos` (
  `ProductoID` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(300) NOT NULL,
  `Descripcion` VARCHAR(200) NULL,
  `PrecioVenta` DECIMAL(10,2) NOT NULL,
  `Cantidad` INT NULL DEFAULT 0,
  `Imagen` VARCHAR(300) NULL DEFAULT 'producto-default.png',
  `FechaHoraModificacion` DATETIME NOT NULL,
  PRIMARY KEY (`ProductoID`),
  UNIQUE INDEX `Nombre_UNIQUE` (`Nombre` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `samuxybw_pedregal`.`paquetes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `samuxybw_pedregal`.`paquetes` (
  `PaqueteID` INT NOT NULL AUTO_INCREMENT,
  `ProductoID` INT NOT NULL,
  `Nombre` VARCHAR(150) NOT NULL,
  `Descripcion` VARCHAR(300) NULL,
  `UnidadesTotales` INT NOT NULL,
  `PrecioVenta` DECIMAL(10,2) NOT NULL,
  `MedidaBase` INT NULL,
  PRIMARY KEY (`PaqueteID`),
  INDEX `fkMercaderiasProductoID_idx` (`ProductoID` ASC) VISIBLE,
  INDEX `fkPaquetePaqueteID_idx` (`MedidaBase` ASC) VISIBLE,
  CONSTRAINT `fkMercaderiasProductoID`
    FOREIGN KEY (`ProductoID`)
    REFERENCES `samuxybw_pedregal`.`productos` (`ProductoID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fkPaquetePaqueteID`
    FOREIGN KEY (`MedidaBase`)
    REFERENCES `samuxybw_pedregal`.`paquetes` (`PaqueteID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `samuxybw_pedregal`.`proveedores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `samuxybw_pedregal`.`proveedores` (
  `ProveedorID` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(300) NOT NULL,
  `Celular` VARCHAR(45) NOT NULL,
  `Notas` VARCHAR(45) NULL,
  PRIMARY KEY (`ProveedorID`),
  UNIQUE INDEX `Nombre_UNIQUE` (`Nombre` ASC) VISIBLE,
  UNIQUE INDEX `Celular_UNIQUE` (`Celular` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `samuxybw_pedregal`.`proveedorespaquetes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `samuxybw_pedregal`.`proveedorespaquetes` (
  `ProveedorPaqueteID` INT NOT NULL AUTO_INCREMENT,
  `ProveedorID` INT NOT NULL,
  `PaqueteID` INT NOT NULL,
  `PrecioCompra` DECIMAL(10,2) NOT NULL,
  `Notas` VARCHAR(150) NULL,
  PRIMARY KEY (`ProveedorPaqueteID`),
  INDEX `fkPaquetesIDPaquetes_idx` (`PaqueteID` ASC) VISIBLE,
  INDEX `fkProveedoresProveedorID_idx` (`ProveedorID` ASC) VISIBLE,
  CONSTRAINT `fkPaquetesIDPaquetes`
    FOREIGN KEY (`PaqueteID`)
    REFERENCES `samuxybw_pedregal`.`paquetes` (`PaqueteID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fkProveedoresProveedorID`
    FOREIGN KEY (`ProveedorID`)
    REFERENCES `samuxybw_pedregal`.`proveedores` (`ProveedorID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `samuxybw_pedregal`.`detallescompra`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `samuxybw_pedregal`.`detallescompra` (
  `DetalleCompraID` INT NOT NULL AUTO_INCREMENT,
  `CompraID` INT NOT NULL,
  `PaqueteID` INT NOT NULL,
  `PrecioCompra` DECIMAL(10,2) NOT NULL,
  `Cantidad` INT NOT NULL,
  `Subtotal` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`DetalleCompraID`),
  INDEX `fkDetallesCompraCompraID_idx` (`CompraID` ASC) VISIBLE,
  INDEX `fkDetallesCompraPaqueteID_idx` (`PaqueteID` ASC) VISIBLE,
  CONSTRAINT `fkDetallesCompraPaqueteID`
    FOREIGN KEY (`PaqueteID`)
    REFERENCES `samuxybw_pedregal`.`proveedorespaquetes` (`ProveedorPaqueteID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fkDetallesCompraCompraID`
    FOREIGN KEY (`CompraID`)
    REFERENCES `samuxybw_pedregal`.`compras` (`CompraID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `samuxybw_pedregal`.`detallesventa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `samuxybw_pedregal`.`detallesventa` (
  `DetalleVentaID` INT NOT NULL AUTO_INCREMENT,
  `VentaID` INT NOT NULL,
  `PaqueteID` INT NULL,
  `ProductoID` INT NULL,
  `PrecioVenta` DECIMAL(10,2) NOT NULL,
  `Subtotal` DECIMAL(10,2) NOT NULL,
  `Cantidad` INT NOT NULL,
  `Utilidad` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`DetalleVentaID`),
  INDEX `fkDetallesVentaVentaID_idx` (`VentaID` ASC) VISIBLE,
  INDEX `fkDetallesVentaProductoID_idx` (`ProductoID` ASC) VISIBLE,
  INDEX `fkDetallesVentaPaqueteID_idx` (`PaqueteID` ASC) VISIBLE,
  CONSTRAINT `fkDetallesVentaVentaID`
    FOREIGN KEY (`VentaID`)
    REFERENCES `samuxybw_pedregal`.`ventas` (`VentaID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fkDetallesVentaPaqueteID`
    FOREIGN KEY (`PaqueteID`)
    REFERENCES `samuxybw_pedregal`.`proveedorespaquetes` (`ProveedorPaqueteID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fkDetallesVentaProductoID`
    FOREIGN KEY (`ProductoID`)
    REFERENCES `samuxybw_pedregal`.`productos` (`ProductoID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `samuxybw_pedregal`.`sesiones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `samuxybw_pedregal`.`sesiones` (
  `SesionID` INT NOT NULL AUTO_INCREMENT,
  `EmpleadoID` INT NOT NULL,
  `TokenRefresco` VARCHAR(512) NOT NULL,
  `FechaCreacion` DATETIME NOT NULL,
  `FechaExpiracion` DATETIME NOT NULL,
  `Activo` TINYINT NULL DEFAULT 1,
  `Plataforma` VARCHAR(300) NOT NULL,
  PRIMARY KEY (`SesionID`),
  INDEX `fkSesionesEmpleadoID_idx` (`EmpleadoID` ASC) VISIBLE,
  UNIQUE INDEX `TokenRefresco_UNIQUE` (`TokenRefresco` ASC) VISIBLE,
  CONSTRAINT `fkSesionesEmpleadoID`
    FOREIGN KEY (`EmpleadoID`)
    REFERENCES `samuxybw_pedregal`.`empleados` (`EmpleadoID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `samuxybw_pedregal`;

DELIMITER $$
USE `samuxybw_pedregal`$$
CREATE DEFINER = CURRENT_USER TRIGGER `samuxybw_pedregal`.`detallesventa_AFTER_INSERT` AFTER INSERT ON `detallesventa` FOR EACH ROW
BEGIN
-- Solo actualizar si es un producto individual (no paquete)
    IF NEW.ProductoID IS NOT NULL THEN
        UPDATE productos 
        SET Cantidad = Cantidad - NEW.Cantidad,
            FechaHoraModificacion = NOW()
        WHERE ProductoID = NEW.ProductoID;
    END IF;
    
    -- Si es un paquete, actualizar los productos del paquete
    IF NEW.PaqueteID IS NOT NULL THEN
        UPDATE productos p
        INNER JOIN paquetes paq ON paq.ProductoID = p.ProductoID
        SET p.Cantidad = p.Cantidad - (paq.UnidadesTotales * NEW.Cantidad),
            p.FechaHoraModificacion = NOW()
        WHERE paq.PaqueteID = NEW.PaqueteID;
    END IF;
END$$

USE `samuxybw_pedregal`$$
CREATE DEFINER = CURRENT_USER TRIGGER `samuxybw_pedregal`.`detallescompra_AFTER_INSERT` AFTER INSERT ON `detallescompra` FOR EACH ROW
BEGIN
	DECLARE unidades_paquete INT;
    DECLARE producto_id INT;
    
    -- Obtener las unidades totales del paquete y el ProductoID
    SELECT UnidadesTotales, ProductoID 
    INTO unidades_paquete, producto_id
    FROM paquetes 
    WHERE PaqueteID = NEW.PaqueteID;
    
    -- Actualizar la cantidad en Productos
    UPDATE productos 
    SET Cantidad = Cantidad + (NEW.Cantidad * unidades_paquete),
        FechaHoraModificacion = NOW()
    WHERE ProductoID = producto_id;
END$$


DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;