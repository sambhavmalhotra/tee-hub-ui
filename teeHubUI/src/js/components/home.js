angular
    .module('homeModule', [])
    .controller('homeController', [
        '$scope', 'homeServiceService',
        function ($scope, homeServiceService) {
            var vm = this;
            $scope.openImage = false;
            $scope.showLoader = false;
            $scope.showPosts = true;
            $scope.isCartOpen = false;
            $scope.totalPrice = 0;
            vm.orderByForData = "name";
            vm.sizesToShow = [];
            vm.tShirtsData = [];
            vm.tShirtsDataToShow = [];
            vm.sizeList = [{
                name: "XS",
                isSelected: false
            }, {
                name: "S",
                isSelected: false
            }, {
                name: "M",
                isSelected: false
            }, {
                name: "L",
                isSelected: false
            }, {
                name: "XL",
                isSelected: false
            }, {
                name: "XXL",
                isSelected: false
            }];
            vm.cartData = [];

            function openShowLoader() {
                $scope.showLoader = true;
            }

            function closeShowLoader() {
                $scope.showLoader = false;
            }

            $scope.openNav = function() {
                $scope.isCartOpen = true;
            };

            /* Set the width of the side navigation to 0 */
            $scope.closeNav = function() {
                $scope.isCartOpen = false;
            };

            vm.orderByClick = function(value) {
                vm.orderByForData = value;
            };

            vm.selectSize = function(size) {
                openShowLoader();
                var sizes = angular.copy(vm.sizesToShow);
                angular.forEach(vm.sizeList, function(row) {
                    if(row.name === size) {
                        if(row.isSelected) {
                            var index = sizes.findIndex(function(val) {
                                return val.name === size;
                            });
                            if(index > -1) {
                                sizes.splice(index, 1);
                                row.isSelected = false;
                            }
                        } else {
                            if(sizes.length === vm.sizeList.length) {
                                sizes = [];
                            }
                            row.isSelected = true;
                            sizes.push(row);
                        }
                    }
                });
                loadSizesToShow(sizes);
                filterDataToShow(sizes);
                closeShowLoader();
            };

            function loadSizesToShow(sizes) {
                vm.sizesToShow = angular.copy(sizes);
            }

            function filterDataToShow(sizesList) {
                vm.tShirtsDataToShow = [];
                if(sizesList.length !== 0) {
                    var sizes = sizesList.map(function(size) {
                        return size.name;
                    });
                    vm.tShirtsDataToShow = vm.tShirtsData.filter(function(row) {
                        return sizes.some(function(size) {
                            return (row.size ===size);
                        });
                    });
                    console.log(vm.tShirtsDataToShow);
                } else {
                    vm.tShirtsDataToShow = angular.copy(vm.tShirtsData);
                }
            }

            vm.removeFromCart = function(val) {
                angular.forEach(vm.tShirtsDataToShow, function(row) {
                    if(row.id === Number(val)) {
                        row.isAddedToCart = false;
                        var index = vm.cartData.findIndex(function (data) {
                            return data.id === Number(val);
                        });
                        if(index > -1) {
                            $scope.totalPrice = Number($scope.totalPrice) - Number(row.price);
                            vm.cartData.splice(index, 1);
                        }
                    }
                });
            };

            vm.addToCart = function(val) {
                angular.forEach(vm.tShirtsDataToShow, function(row) {
                    if(row.id === Number(val)) {
                        row.isAddedToCart = true;
                        vm.cartData.push(row);
                        $scope.totalPrice = Number($scope.totalPrice) + Number(row.price);
                    }
                });
            };

            $scope.checkoutCart = function() {
                alert("Congratulation! You just finished the last step of this sample app.")
            };

            function getTShirtsData() {
                openShowLoader();
                loadSizesToShow(vm.sizeList);
                homeServiceService.getData().then(function (response) {
                    angular.forEach(response.data, function(row) {
                        row["imageUrl"] = "data:image/jpg;base64," + row.image;
                        row["isAddedToCart"] = false;
                    });
                    vm.tShirtsData = angular.copy(response.data);
                    filterDataToShow(vm.sizeList);
                    closeShowLoader();
                }, function (error) {
                    closeShowLoader();
                });
            }

            getTShirtsData();
        }
    ]);
