import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class ProductGrid extends StatelessWidget {
  const ProductGrid({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Title for featured products section
        const Padding(
          padding: EdgeInsets.fromLTRB(16, 0, 16, 12),
          child: Text(
            'Featured Deals',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w600,
            ),
          ),
        ),

        // Horizontal scrollable large containers
        SizedBox(
          height: 180,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            itemCount: 5,
            padding: const EdgeInsets.only(left: 16),
            itemBuilder: (context, index) {
              return GestureDetector(
                onTap: () {
                  // Handle tap on featured product
                },
                child: Container(
                  width: 300,
                  margin: const EdgeInsets.only(right: 16),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(20),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.08),
                        blurRadius: 10,
                        offset: const Offset(0, 5),
                      ),
                    ],
                  ),
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(20),
                    child: Stack(
                      fit: StackFit.expand,
                      children: [
                        // Featured product image
                        Image.asset(
                          _getFeaturedImageAsset(index),
                          fit: BoxFit.cover,
                        ),
                        // Gradient overlay for text readability
                        Container(
                          decoration: BoxDecoration(
                            gradient: LinearGradient(
                              begin: Alignment.topCenter,
                              end: Alignment.bottomCenter,
                              colors: [
                                Colors.transparent,
                                Colors.black.withOpacity(0.7),
                              ],
                              stops: const [0.6, 1.0],
                            ),
                          ),
                        ),
                        // Text overlay at bottom
                        Positioned(
                          bottom: 16,
                          left: 16,
                          right: 16,
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                _getFeaturedProductName(index),
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                'Up to ${20 + (index * 5)}% off',
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 14,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              );
            },
          ),
        ),

        const SizedBox(height: 24),

        // Title for product listings
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 0, 16, 12),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'Top Products',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                ),
              ),
              TextButton(
                onPressed: () {
                  // Navigate to all products
                },
                child: const Text(
                  'View All',
                  style: TextStyle(
                    color: Color(0xFF007AFF),
                    fontSize: 14,
                  ),
                ),
              ),
            ],
          ),
        ),

        // Vertical scrollable product grid
        ListView.builder(
          shrinkWrap: true,
          physics:
              const NeverScrollableScrollPhysics(), // Disable scrolling for this list
          itemCount: 6,
          padding: EdgeInsets.zero,
          itemBuilder: (context, index) {
            return _buildProductItem(index);
          },
        ),

        const SizedBox(height: 24),

        // Title for tools products
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 0, 16, 12),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'Top Tools',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                ),
              ),
              TextButton(
                onPressed: () {
                  // Navigate to all tools
                },
                child: const Text(
                  'View All',
                  style: TextStyle(
                    color: Color(0xFF007AFF),
                    fontSize: 14,
                  ),
                ),
              ),
            ],
          ),
        ),

        // Tools product list
        ListView.builder(
          shrinkWrap: true,
          physics:
              const NeverScrollableScrollPhysics(), // Disable scrolling for this list
          itemCount: 6,
          padding: EdgeInsets.zero,
          itemBuilder: (context, index) {
            return _buildToolItem(index);
          },
        ),
      ],
    );
  }

  Widget _buildProductItem(int index) {
    final bool isEven = index % 2 == 0;
    final String productName = _getProductName(index);
    final double price = _getProductPrice(index);
    final double originalPrice = price * 1.2;
    final int discount =
        ((originalPrice - price) / originalPrice * 100).round();

    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
      child: Container(
        height: 120,
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(20),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.06),
              blurRadius: 8,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Row(
          children: [
            // Product image
            ClipRRect(
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(20),
                bottomLeft: Radius.circular(20),
              ),
              child: SizedBox(
                width: 120,
                height: 120,
                child: Image.asset(
                  _getImageAsset(index),
                  fit: BoxFit.cover,
                ),
              ),
            ),

            // Product details
            Expanded(
              child: Padding(
                padding: const EdgeInsets.all(12),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    // Product name
                    Text(
                      productName,
                      style: const TextStyle(
                        fontWeight: FontWeight.w600,
                        fontSize: 15,
                      ),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: 8),

                    // Price row
                    Row(
                      children: [
                        // Current price
                        Text(
                          '\$${price.toStringAsFixed(2)}',
                          style: const TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 16,
                            color: Color(0xFF007AFF),
                          ),
                        ),
                        const SizedBox(width: 8),

                        // Original price (strikethrough)
                        Text(
                          '\$${originalPrice.toStringAsFixed(2)}',
                          style: const TextStyle(
                            decoration: TextDecoration.lineThrough,
                            color: Colors.grey,
                            fontSize: 13,
                          ),
                        ),

                        // Discount badge
                        Container(
                          margin: const EdgeInsets.only(left: 8),
                          padding: const EdgeInsets.symmetric(
                              horizontal: 6, vertical: 2),
                          decoration: BoxDecoration(
                            color: const Color(0xFFFF3B30).withOpacity(0.1),
                            borderRadius: BorderRadius.circular(4),
                          ),
                          child: Text(
                            '-$discount%',
                            style: const TextStyle(
                              color: Color(0xFFFF3B30),
                              fontSize: 12,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ],
                    ),

                    const SizedBox(height: 8),

                    // Rating and favorite row
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        // Star rating
                        Row(
                          children: [
                            const Icon(
                              Icons.star,
                              color: Color(0xFFFFCC00),
                              size: 16,
                            ),
                            const SizedBox(width: 4),
                            Text(
                              '${4.0 + (index % 10) / 10}',
                              style: const TextStyle(
                                color: Colors.grey,
                                fontSize: 13,
                              ),
                            ),
                          ],
                        ),

                        // Favorite icon button
                        Container(
                          decoration: BoxDecoration(
                            color: Colors.grey.withOpacity(0.1),
                            shape: BoxShape.circle,
                          ),
                          child: IconButton(
                            icon: const FaIcon(
                              FontAwesomeIcons.heart,
                              size: 14,
                              color: Colors.grey,
                            ),
                            constraints: const BoxConstraints(
                              minWidth: 32,
                              minHeight: 32,
                            ),
                            padding: EdgeInsets.zero,
                            iconSize: 14,
                            onPressed: () {
                              // Add to favorites
                            },
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildToolItem(int index) {
    final String toolName = _getToolName(index);
    final double price = _getToolPrice(index);
    final double originalPrice =
        price * 1.25; // Tools have a different discount
    final int discount =
        ((originalPrice - price) / originalPrice * 100).round();

    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
      child: Container(
        height: 130,
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(20),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.06),
              blurRadius: 8,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Row(
          children: [
            // Tool image
            ClipRRect(
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(20),
                bottomLeft: Radius.circular(20),
              ),
              child: SizedBox(
                width: 120,
                height: 120,
                child: Image.asset(
                  _getToolImageAsset(index),
                  fit: BoxFit.cover,
                ),
              ),
            ),

            // Tool details
            Expanded(
              child: Padding(
                padding: const EdgeInsets.all(12),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    // Tool name
                    Text(
                      toolName,
                      style: const TextStyle(
                        fontWeight: FontWeight.w600,
                        fontSize: 15,
                      ),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: 8),

                    // Price row
                    Row(
                      children: [
                        // Current price
                        Text(
                          '\$${price.toStringAsFixed(2)}',
                          style: const TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 16,
                            color: Color(0xFF007AFF),
                          ),
                        ),
                        const SizedBox(width: 8),

                        // Original price (strikethrough)
                        Text(
                          '\$${originalPrice.toStringAsFixed(2)}',
                          style: const TextStyle(
                            decoration: TextDecoration.lineThrough,
                            color: Colors.grey,
                            fontSize: 13,
                          ),
                        ),

                        // Discount badge
                        Container(
                          margin: const EdgeInsets.only(left: 8),
                          padding: const EdgeInsets.symmetric(
                              horizontal: 6, vertical: 2),
                          decoration: BoxDecoration(
                            color: const Color(0xFFFF3B30).withOpacity(0.1),
                            borderRadius: BorderRadius.circular(4),
                          ),
                          child: Text(
                            '-$discount%',
                            style: const TextStyle(
                              color: Color(0xFFFF3B30),
                              fontSize: 12,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ],
                    ),

                    const SizedBox(height: 8),

                    // Rating and favorite row
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        // Star rating
                        Row(
                          children: [
                            const Icon(
                              Icons.star,
                              color: Color(0xFFFFCC00),
                              size: 16,
                            ),
                            const SizedBox(width: 4),
                            Text(
                              '${4.2 + (index % 8) / 10}',
                              style: const TextStyle(
                                color: Colors.grey,
                                fontSize: 13,
                              ),
                            ),
                          ],
                        ),

                        // Favorite icon button
                        Container(
                          decoration: BoxDecoration(
                            color: Colors.grey.withOpacity(0.1),
                            shape: BoxShape.circle,
                          ),
                          child: IconButton(
                            icon: const FaIcon(
                              FontAwesomeIcons.heart,
                              size: 14,
                              color: Colors.grey,
                            ),
                            constraints: const BoxConstraints(
                              minWidth: 32,
                              minHeight: 32,
                            ),
                            padding: EdgeInsets.zero,
                            iconSize: 14,
                            onPressed: () {
                              // Add to favorites
                            },
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // Function to get featured images
  String _getFeaturedImageAsset(int index) {
    return 'lib/images/elect${index + 1}.jpeg';
  }

  // Function to get asset image paths dynamically
  String _getImageAsset(int index) {
    return 'lib/images/shoes${index + 1}.jpeg';
  }

  // Function to get tool image paths
  String _getToolImageAsset(int index) {
    return 'lib/images/tools${index + 1}.jpeg';
  }

  // Function to get product names
  String _getProductName(int index) {
    List<String> productNames = [
      'Nike Air Max 270 Running Shoes',
      'Apple AirPods Pro with Noise Cancellation',
      'Samsung 55" QLED 4K Smart TV',
      'DeWalt Power Drill Tool Set',
      'Logitech MX Master 3 Wireless Mouse',
      'Sony WH-1000XM4 Noise Cancelling Headphones',
      'ASUS ROG Gaming Laptop',
      'Canon EOS Digital Camera',
    ];
    return productNames[index % productNames.length];
  }

  // Function to get tool names
  String _getToolName(int index) {
    List<String> toolNames = [
      'DeWalt 20V MAX Cordless Drill Set',
      'Milwaukee M18 Impact Driver Kit',
      'Bosch 12" Dual-Bevel Sliding Miter Saw',
      'Makita 18V LXT Brushless Kit',
      'CRAFTSMAN V20 Cordless Chainsaw',
      'BLACK+DECKER 20V MAX Oscillating Tool',
      'RIDGID 18V Cordless Jobsite Vacuum',
      'RYOBI ONE+ 18V Cordless Router',
    ];
    return toolNames[index % toolNames.length];
  }

  // Function to get featured product names
  String _getFeaturedProductName(int index) {
    List<String> productNames = [
      'Flash Sale: Electronics',
      'New Season: Fashion',
      'Gaming Deals',
      'Home Essentials',
      'Tech Gadgets',
    ];
    return productNames[index % productNames.length];
  }

  // Function to generate realistic product prices
  double _getProductPrice(int index) {
    List<double> prices = [
      129.99,
      199.99,
      599.99,
      149.99,
      89.99,
      249.99,
      899.99,
      649.99,
    ];
    return prices[index % prices.length];
  }

  // Function to generate realistic tool prices
  double _getToolPrice(int index) {
    List<double> prices = [
      179.99,
      229.99,
      349.99,
      279.99,
      159.99,
      119.99,
      199.99,
      149.99,
    ];
    return prices[index % prices.length];
  }
}
