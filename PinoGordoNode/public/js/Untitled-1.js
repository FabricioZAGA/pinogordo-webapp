'<tr><td data-th="Product"><div class="row"><div class="col-sm-2 hidden-xs"><img src="'
+ element.Imagen + ' " alt="..." class="img-responsive"/></div><div class="col-sm-10"><h4 class="pl-sm-5">'
+ element.Nombre + '</h4><p class="pl-sm-5">'
+ element.Descripcion + '</p></div></div></td><td data-th="Price">'
+ element.Precio + '</td><td data-th="Quantity"><input type="number" class="form-control text-center" value="'
+ element.Quantity + '" disabled></td><td data-th="Subtotal" class="text-center">'
+ element.Subtotal + '</td><td class="actions" data-th=""><button class="btn btn-danger btn-sm" onclick="RemoveFromCart('
+ element.IdDetalle + ')"><i class="fa fa-trash-o"></i></button></td></tr>'	