import 'package:flutter/material.dart';

class ProductGrid extends StatelessWidget {
  const ProductGrid({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: [
          _buildProductRow(),
          const SizedBox(height: 16),
          _buildProductRow(),
        ],
      ),
    );
  }

  Widget _buildProductRow() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Row(
        children: List.generate(
          3,
          (index) => Expanded(
            child: Container(
              height: 120,
              margin: EdgeInsets.only(
                left: index == 0 ? 0 : 8,
                right: index == 2 ? 0 : 8,
              ),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(10),
                color: Colors.grey[200], // Background color if needed
              ),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(10),
                child: Image.asset(
                  _getImageAsset(index),
                  fit: BoxFit.cover,
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

// Function to get asset image paths dynamically
  String _getImageAsset(int index) {
    List<String> imageAssets = [
      'lib/images/game3.jpeg',
      'lib/images/game4.jpeg',
      'lib/images/game5.jpeg',
      'lib/images/game6.jpeg',
      'lib/images/game7.jpeg',
      'lib/images/game8.jpeg',
      'lib/images/game9.jpeg',
      'lib/images/game10.jpeg',
    ];
    return imageAssets[index % imageAssets.length]; // Loops images if needed
  }
}
